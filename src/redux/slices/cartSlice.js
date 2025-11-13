import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { items: [], totalAmount: 0 };
  } catch {
    return { items: [], totalAmount: 0 };
  }
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const { product, variant, quantity } = action.payload;
      const existingItem = state.items.find(item => 
        item.product._id === product._id && 
        item.variant._id === variant._id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          variant,
          quantity,
          price: variant.price,
          total: variant.price * quantity
        });
      }

      state.totalAmount = state.items.reduce((total, item) => 
        total + (item.variant.price * item.quantity), 0
      );
      
      saveCartToStorage(state);
    },

    removeFromCart: (state, action) => {
      const { productId, variantId } = action.payload;
      state.items = state.items.filter(item => 
        !(item.product._id === productId && item.variant._id === variantId)
      );

      state.totalAmount = state.items.reduce((total, item) => 
        total + (item.variant.price * item.quantity), 0
      );
      
      saveCartToStorage(state);
    },

    updateCartQuantity: (state, action) => {
      const { productId, variantId, quantity } = action.payload;
      const item = state.items.find(item => 
        item.product._id === productId && item.variant._id === variantId
      );

      if (item) {
        item.quantity = quantity;
        item.total = item.variant.price * quantity;
      }

      state.totalAmount = state.items.reduce((total, item) => 
        total + (item.variant.price * item.quantity), 0
      );
      
      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateCartQuantity, 
  clearCart 
} = cartSlice.actions;
export default cartSlice.reducer;