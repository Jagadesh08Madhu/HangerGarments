import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sliders: [],
  activeSliders: [],
  currentSlider: null,
  loading: false,
  error: null,
};

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSliders: (state, action) => {
      state.sliders = action.payload;
    },
    setActiveSliders: (state, action) => {
      state.activeSliders = action.payload;
    },
    setCurrentSlider: (state, action) => {
      state.currentSlider = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  setSliders, 
  setActiveSliders, 
  setCurrentSlider, 
  clearError 
} = sliderSlice.actions;
export default sliderSlice.reducer;