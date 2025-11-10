import React, { useState, useEffect } from 'react'
import SideNav from "./SideNav";
import { SidebarProvider } from "../../context/SidebarContext";
import AdminNav from "./AdminNav";
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showCustomColor , setShowCustomColor] = useState(false)
  const { theme } = useTheme()

  // Product basic information
  const [product, setProduct] = useState({
    name: '',
    productCode: '',
    description: '',
    normalPrice: '',
    offerPrice: '',
    wholesalePrice: '',
    categoryId: '',
    subcategoryId: '',
    status: 'ACTIVE',
  });


  // Product details (features, specifications)
  const [productDetails, setProductDetails] = useState([
    { title: '', description: '' },
  
  ]);

  // Professional variant structure: color -> sizes + images
  const [variants, setVariants] = useState({});

  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const commonColors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Gray', 'Navy', 'Maroon', 'Olive'];

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://garments-backend-jlqb.onrender.com/api/category');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to load categories');
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(`https://garments-backend-jlqb.onrender.com/api/subcategory?categoryId=${categoryId}`);
      setSubcategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
    }
  };

  // Handle basic product input changes
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'categoryId') {
      fetchSubcategories(value);
      setProduct(prev => ({ ...prev, subcategoryId: '' }));
    }

    // Update SKUs when product code changes
    if (name === 'productCode' && value) {
      updateAllSKUs(value);
    }
  };

  // Update all SKUs when product code changes
  const updateAllSKUs = (productCode) => {
    setVariants(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(color => {
        updated[color] = {
          ...updated[color],
          sizes: updated[color].sizes.map(size => ({
            ...size,
            sku: `${productCode}-${color}-${size.size}`
          }))
        };
      });
      return updated;
    });
  };

  // Handle product details changes
  const handleDetailChange = (index, field, value) => {
    const newDetails = [...productDetails];
    newDetails[index][field] = value;
    setProductDetails(newDetails);
  };

  const addProductDetail = () => {
    setProductDetails([...productDetails, { title: '', description: '' }]);
  };

  const removeProductDetail = (index) => {
    if (productDetails.length > 1) {
      const newDetails = productDetails.filter((_, i) => i !== index);
      setProductDetails(newDetails);
    }
  };

  // Color Variant Management
  const addColorVariant = (colorName = '') => {
    const color = colorName.trim() || `Color${Object.keys(variants).length + 1}`;

    if (variants[color]) {
      alert(`Color "${color}" already exists!`);
      return;
    }

    const newVariant = {
      sizes: commonSizes.map(size => ({
        size,
        stock: 0,
        sku: product.productCode ? `${product.productCode}-${color}-${size}` : `${color}-${size}`
      })),
      images: [],
      imagePreviews: []
    };

    setVariants(prev => ({
      ...prev,
      [color]: newVariant
    }));
  };

  // Update size stock for a color
  const updateSizeStock = (color, sizeIndex, stock) => {
    setVariants(prev => ({
      ...prev,
      [color]: {
        ...prev[color],
        sizes: prev[color].sizes.map((size, index) =>
          index === sizeIndex ? { ...size, stock: parseInt(stock) || 0 } : size
        )
      }
    }));
  };

  // Handle color image upload
  const handleColorImages = (color, files) => {
    const fileList = Array.from(files);

    if (variants[color].images.length + fileList.length > 10) {
      alert('Maximum 10 images per color allowed');
      return;
    }

    setVariants(prev => ({
      ...prev,
      [color]: {
        ...prev[color],
        images: [...prev[color].images, ...fileList],
        imagePreviews: [
          ...prev[color].imagePreviews,
          ...fileList.map(file => URL.createObjectURL(file))
        ]
      }
    }));
  };

  // Remove color image
  const removeColorImage = (color, imageIndex) => {
    setVariants(prev => {
      const updatedColor = { ...prev[color] };

      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(updatedColor.imagePreviews[imageIndex]);

      updatedColor.images = updatedColor.images.filter((_, i) => i !== imageIndex);
      updatedColor.imagePreviews = updatedColor.imagePreviews.filter((_, i) => i !== imageIndex);

      return {
        ...prev,
        [color]: updatedColor
      };
    });
  };

  // Remove color variant
  const removeColorVariant = (color) => {
    // Clean up all image URLs to prevent memory leaks
    variants[color].imagePreviews.forEach(url => URL.revokeObjectURL(url));

    setVariants(prev => {
      const updated = { ...prev };
      delete updated[color];
      return updated;
    });
  };

  // Add custom size to a color
  const addCustomSize = (color, sizeName = '') => {
    const size = sizeName.trim().toUpperCase();
    if (!size) return;

    // Check if size already exists
    if (variants[color].sizes.some(s => s.size === size)) {
      alert(`Size "${size}" already exists for ${color}`);
      return;
    }

    setVariants(prev => ({
      ...prev,
      [color]: {
        ...prev[color],
        sizes: [
          ...prev[color].sizes,
          {
            size,
            stock: 0,
            sku: product.productCode ? `${product.productCode}-${color}-${size}` : `${color}-${size}`
          }
        ].sort((a, b) => commonSizes.indexOf(a.size) - commonSizes.indexOf(b.size))
      }
    }));
  };

  // Remove size from color
  const removeSize = (color, sizeIndex) => {
    if (variants[color].sizes.length <= 1) {
      alert('At least one size is required per color');
      return;
    }

    setVariants(prev => ({
      ...prev,
      [color]: {
        ...prev[color],
        sizes: prev[color].sizes.filter((_, index) => index !== sizeIndex)
      }
    }));
  };

  // Generate product code
  const generateProductCode = () => {
    const category = categories.find(cat => cat.id === product.categoryId);
    const categoryCode = category ? category.name.substring(0, 3).toUpperCase() : 'PRO';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const code = `${categoryCode}${randomNum}`;

    setProduct(prev => ({
      ...prev,
      productCode: code
    }));

    updateAllSKUs(code);
  };

  // Generate variants data for API
  const generateVariantsData = () => {
    return Object.entries(variants)
      .filter(([color, data]) => data.images.length > 0) // Only colors with images
      .map(([color, data]) => ({
        color,
        sizes: data.sizes.filter(size => size.stock >= 0) // Only valid stock sizes
      }));
  };

  // Form validation
  const validateForm = () => {
    if (!product.name.trim()) {
      alert('Product name is required');
      return false;
    }
    if (!product.productCode.trim()) {
      alert('Product code is required');
      return false;
    }
    if (!product.normalPrice || parseFloat(product.normalPrice) <= 0) {
      alert('Valid normal price is required');
      return false;
    }
    if (!product.categoryId) {
      alert('Category is required');
      return false;
    }

    // Validate product details
    for (let detail of productDetails) {
      if (!detail.title.trim() || !detail.description.trim()) {
        alert('All product details must have both title and description');
        return false;
      }
    }

    // Validate variants
    const variantsData = generateVariantsData();
    if (variantsData.length === 0) {
      alert('At least one color variant with images is required');
      return false;
    }

    // Check that each color has at least one size with stock
    for (let variant of variantsData) {
      const validSizes = variant.sizes.filter(size => size.stock > 0);
      if (validSizes.length === 0) {
        alert(`Color "${variant.color}" must have at least one size with stock`);
        return false;
      }
    }

    return true;
  };

  // Professional form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // 1. Add basic product data
      Object.entries(product).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value);
        }
      });

      // 2. Add product details
      formData.append('productDetails', JSON.stringify(productDetails));

      // 3. Add variants structure (only colors with images and valid sizes)
      const variantsData = generateVariantsData();
      formData.append('variants', JSON.stringify(variantsData));

      // 4. Add images in professional format: variantImages[color][index]
      Object.entries(variants).forEach(([color, data]) => {
        // Only add images for colors that are being submitted
        if (variantsData.some(v => v.color === color)) {
          data.images.forEach((image, index) => {
            formData.append(`variantImages[${color}]`, image);
          });
        }
      });

      console.log('=== PRODUCT SUBMISSION DATA ===');
      console.log('Product:', product);
      console.log('Variants:', variantsData);
      console.log('Total Images:', Object.values(variants).reduce((sum, data) => sum + data.images.length, 0));
      console.log('Total Variants:', variantsData.reduce((sum, variant) => sum + variant.sizes.length, 0));

      const response = await axios.post('https://garments-backend-jlqb.onrender.com/api/products/admin', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000
      });

      console.log('✅ Product creation response:', response.data);

      if (response.data.success) {
        alert('Product created successfully!');
        resetForm();
      }
    } catch (error) {
      console.error('❌ Error creating product:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create product';
      alert(`Error: ${errorMessage}`);

      if (error.response?.data) {
        console.error('Server error details:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setProduct({
      name: '',
      productCode: '',
      description: '',
      normalPrice: '',
      offerPrice: '',
      wholesalePrice: '',
      categoryId: '',
      subcategoryId: '',
      status: 'ACTIVE',
    });



    // Clean up all image URLs
    Object.values(variants).forEach(data => {
      data.imagePreviews.forEach(url => URL.revokeObjectURL(url));
    });

    setVariants({});
  };

  // Calculate statistics
  const getProductStats = () => {
    const colors = Object.keys(variants);
    const totalVariants = Object.values(variants).reduce(
      (sum, data) => sum + data.sizes.filter(size => size.stock > 0).length, 0
    );
    const totalImages = Object.values(variants).reduce(
      (sum, data) => sum + data.images.length, 0
    );
    const colorsWithImages = colors.filter(color => variants[color].images.length > 0);

    return {
      colors: colors.length,
      colorsWithImages: colorsWithImages.length,
      totalVariants,
      totalImages
    };
  };

  const stats = getProductStats();
  return (
    <SidebarProvider>
      <section className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
        {/* Sidebar */}
        <SideNav />

        {/* Main Content Area */}
        <div className="flex-1">
          <AdminNav />

          <div className="p-4 text-gray-800 bg-gray-50 dark:bg-gray-950 ">
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
              <div className="max-w-7xl mx-auto ">
                <div className="bg-gray-50 dark:bg-gray-950 rounded-lg shadow-lg dark:shadow-gray-600 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                    <h1 className="text-2xl font-bold font-italiana text-white">Create New Product</h1>
                    <p className="text-blue-100 font-instrument mt-1">Professional product management system</p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Basic Information Section */}
                    <section className="bg-white dark:bg-gray-950  border dark:border-gray-700 border-gray-200 rounded-lg p-6">
                      <h2 className="text-xl font-semibold dark:text-white font-instrument text-gray-900 mb-6 flex items-center">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                        Basic Information
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Product Name */}
                        <div>
                          <label className="block text-sm font-medium dark:text-white font-instrument text-gray-700 mb-2">
                            Product Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleProductChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter product name"
                          />
                        </div>

                        {/* Product Code */}
                        <div>
                          <label className="block text-sm dark:text-white font-instrument font-medium text-gray-700 mb-2">
                            Product Code *
                          </label>
                          <div className="flex flex-col md:flex-row gap-2">
                            <input
                              type="text"
                              name="productCode"
                              value={product.productCode}
                              onChange={handleProductChange}
                              required
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="e.g., TS001"
                            />
                            <button
                              type="button"
                              onClick={generateProductCode}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                            >
                              Generate
                            </button>
                          </div>
                        </div>

                        {/* Category */}
                        <div>
                          <label className="block text-sm dark:text-white font-instrument font-medium text-gray-700 mb-2">
                            Category *
                          </label>
                          <select
                            name="categoryId"
                            value={product.categoryId}
                            onChange={handleProductChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Subcategory */}
                        <div>
                          <label className="block text-sm dark:text-white font-instrument font-medium text-gray-700 mb-2">
                            Subcategory
                          </label>
                          <select
                            name="subcategoryId"
                            value={product.subcategoryId}
                            onChange={handleProductChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Subcategory</option>
                            {subcategories.map(subcategory => (
                              <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Normal Price */}
                        <div>
                          <label className="block text-sm dark:text-white font-instrument font-medium text-gray-700 mb-2">
                            Normal Price *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              name="normalPrice"
                              value={product.normalPrice}
                              onChange={handleProductChange}
                              required
                              min="0"
                              step="0.01"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        {/* Offer Price */}
                        <div>
                          <label className="block text-sm dark:text-white font-instrument font-medium text-gray-700 mb-2">
                            Offer Price
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              name="offerPrice"
                              value={product.offerPrice}
                              onChange={handleProductChange}
                              min="0"
                              step="0.01"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        {/* Wholesale Price */}
                        <div>
                          <label className="block text-sm dark:text-white font-instrument font-medium text-gray-700 mb-2">
                            Wholesale Price
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              name="wholesalePrice"
                              value={product.wholesalePrice}
                              onChange={handleProductChange}
                              min="0"
                              step="0.01"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          <label className="block text-sm font-medium dark:text-white font-instrument text-gray-700 mb-2">
                            Status
                          </label>
                          <select
                            name="status"
                            value={product.status}
                            onChange={handleProductChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                            <option value="OUT_OF_STOCK">Out of Stock</option>
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mt-6">
                        <label className="block text-sm dark:text-white font-instrument font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={product.description}
                          onChange={handleProductChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe your product features, benefits, and specifications..."
                        />
                      </div>
                    </section>

                    {/* Product Details Section */}
                    <section className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
                        <h2 className="text-xl font-semibold dark:text-white font-instrument text-gray-900 flex items-center">
                          <span className="bg-green-100  text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                          Product Details
                        </h2>
                        <button
                          type="button"
                          onClick={addProductDetail}
                          className="px-4 py-2 bg-gray-950 dark:bg-white dark:text-black font-instrument text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                        >
                          + Add Detail
                        </button>
                      </div>

                      <div className="space-y-4">
                        {productDetails.map((detail, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-950">
                            <div>
                              <label className="block text-sm font-medium dark:text-white font-instrument text-gray-700 mb-2">Title *</label>
                              <input
                                type="text"
                                value={detail.title}
                                onChange={(e) => handleDetailChange(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Material"
                                required
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm dark:text-white font-instrument font-medium text-gray-700 mb-2">Description *</label>
                              <input
                                type="text"
                                value={detail.description}
                                onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., 100% Premium Cotton"
                                required
                              />
                            </div>
                            <div className="flex items-end">
                              {productDetails.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeProductDetail(index)}
                                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Color Variants Section */}
                    <section className="bg-white dark:bg-gray-950 border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col gap-4 lg:flex-row justify-between items-start mb-6">
                        <div>
                          <h2 className="text-xl dark:text-white font-instrument font-semibold text-gray-900 flex items-center mb-2">
                            <span className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                            Color Variants
                          </h2>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                              {stats.colors} Colors
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                              {stats.colorsWithImages} With Images
                            </span>
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                              {stats.totalVariants} Variants
                            </span>
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                              {stats.totalImages} Images
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2">
                          {commonColors.map(color => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => addColorVariant(color)}
                              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                            >
                              + {color}
                            </button>
                          ))}
                        </div>

                        {/* ✅ Custom Color Button */}
                        <button
                          type="button"
                          onClick={() => setShowCustomColor(true)}
                          className="px-4 py-2 mt-5 lg:mt-0 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors text-sm"
                        >
                          + Custom Color
                        </button>

                        {/* ✅ Custom Color Input */}
                        {showCustomColor && (
                          <div className="flex items-center gap-3 mt-3">
                            <input
                              type="text"
                              id="customColorInput"
                              placeholder="Enter color name"
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const input = document.getElementById("customColorInput");
                                const colorName = input.value.trim();
                                if (!colorName) {
                                  alert("Please enter a color name");
                                  return;
                                }
                                addColorVariant(colorName);
                                input.value = "";
                                setShowCustomColor(false); // hide input after adding
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              Add Color
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowCustomColor(false)}
                              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      </div>

                      {/* Color Variants List */}
                      <div className="space-y-6">
                        {Object.entries(variants).map(([color, data]) => (
                          <div key={color} className="border-2 border-gray-200 rounded-lg p-6 bg-white dark:bg-gray-950">
                            {/* Color Header */}
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h3 className="text-lg font-semibold dark:text-white font-instrument text-gray-900 capitalize">{color}</h3>
                                <p className="text-sm text-gray-600 dark:text-white font-instrument mt-1">
                                  {data.sizes.filter(size => size.stock > 0).length} sizes with stock • {data.images.length} images
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeColorVariant(color)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                              >
                                Remove Color
                              </button>
                            </div>

                            

                            {/* Sizes Grid */}
                            <div className="mb-6">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="text-md font-medium dark:text-white font-instrument text-gray-700">Sizes & Stock</h4>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Custom size (e.g., 28, 30)"
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        addCustomSize(color, e.target.value);
                                        e.target.value = '';
                                      }
                                    }}
                                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => addCustomSize(color, document.querySelector(`input[placeholder="Custom size"]`)?.value)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                  >
                                    Add Size
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                                {data.sizes.map((size, index) => (
                                  <div key={size.size} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                    <div className="text-center mb-2">
                                      <span className="font-medium text-gray-900">{size.size}</span>
                                    </div>
                                    <input
                                      type="number"
                                      value={size.stock}
                                      onChange={(e) => updateSizeStock(color, index, e.target.value)}
                                      min="0"
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-center text-sm mb-2"
                                      placeholder="Stock"
                                    />
                                    <div className="text-xs text-gray-500 text-center truncate" title={size.sku}>
                                      SKU: {size.sku}
                                    </div>
                                    {data.sizes.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => removeSize(color, index)}
                                        className="w-full mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Color Images */}
                            <div>
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="text-md dark:text-white font-instrument font-medium text-gray-700">
                                  Color Images ({data.images.length}/10)
                                </h4>
                                <span className="text-sm text-gray-500">
                                  First image will be set as primary
                                </span>
                              </div>

                              <div className="mb-4">
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  onChange={(e) => handleColorImages(color, e.target.files)}
                                  className="w-full px-3 py-2 border dark:text-white font-instrument border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-sm dark:text-white font-instrument text-gray-500 mt-1">
                                  Upload high-quality images for {color}. These images will be used for all sizes of this color.
                                </p>
                              </div>

                              {/* Image Previews */}
                              {data.imagePreviews.length > 0 && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image Previews
                                  </label>
                                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {data.imagePreviews.map((preview, index) => (
                                      <div key={index} className="relative group">
                                        <img
                                          src={preview}
                                          alt={`${color} ${index + 1}`}
                                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-300 group-hover:border-blue-500 transition-colors"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => removeColorImage(color, index)}
                                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                        >
                                          ×
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                                          {index === 0 ? 'Primary' : `Image ${index + 1}`}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Submit Section */}
                    <section className="bg-white dark:bg-gray-950 border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row gap-5 justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold dark:text-white font-instrument text-gray-900">Ready to Create Product</h3>
                          <p className="text-gray-600">
                            {stats.totalVariants > 0
                              ? `This will create a product with ${stats.colorsWithImages} colors and ${stats.totalVariants} variants`
                              : 'Add color variants to continue'
                            }
                          </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                          <button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-3 border border-gray-300 dark:text-white text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                          >
                            Reset Form
                          </button>
                          <button
                            type="submit"
                            disabled={loading || stats.totalVariants === 0}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                          >
                            {loading ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Product...
                              </span>
                            ) : (
                              `Create Product (${stats.totalVariants} Variants)`
                            )}
                          </button>
                        </div>
                      </div>
                    </section>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SidebarProvider>
  );
}


