import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// 🔹 ADD PRODUCT
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await api.post("/products", productData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add product");
    }
  }
);

// 🔹 FETCH ALL PRODUCTS
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
  }
);

// 🔹 FETCH SINGLE PRODUCT (for edit)
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch product");
    }
  }
);

// 🔹 UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/products/${id}`, updatedData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update product");
    }
  }
);

// 🔹 DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/products/${id}`);
      return { id, message: res.data?.message || "Product deleted successfully" };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    currentProduct: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ ADD PRODUCT
      .addCase(addProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(addProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.success = true;
        if (a.payload?.data) s.list.push(a.payload.data);
      })
      .addCase(addProduct.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // ✅ FETCH ALL PRODUCTS
      .addCase(fetchProducts.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload?.data || [];
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // ✅ FETCH SINGLE PRODUCT
      .addCase(fetchSingleProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchSingleProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.currentProduct = a.payload?.data || null;
      })
      .addCase(fetchSingleProduct.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // ✅ UPDATE PRODUCT
      .addCase(updateProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(updateProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.success = true;
        const updated = a.payload?.data;
        if (updated) {
          const idx = s.list.findIndex((p) => p.id === updated.id);
          if (idx !== -1) s.list[idx] = updated;
          if (s.currentProduct?.id === updated.id) s.currentProduct = updated;
        }
      })
      .addCase(updateProduct.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // ✅ DELETE PRODUCT
      .addCase(deleteProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.success = true;
        s.list = s.list.filter((p) => p.id !== a.payload.id);
      })
      .addCase(deleteProduct.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
