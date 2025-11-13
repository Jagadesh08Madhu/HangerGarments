import { apiSlice } from './api';

export const sliderService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Public endpoints
    getActiveSliders: builder.query({
      query: () => '/sliders/active',
      providesTags: ['Slider'],
    }),

    // Admin endpoints
    getAllSliders: builder.query({
      query: (params = {}) => ({
        url: '/sliders',
        params,
      }),
      providesTags: ['Slider'],
    }),

    getSliderById: builder.query({
      query: (sliderId) => `/sliders/${sliderId}`,
      providesTags: (result, error, id) => [{ type: 'Slider', id }],
    }),

    createSlider: builder.mutation({
      query: (sliderData) => ({
        url: '/sliders',
        method: 'POST',
        body: sliderData,
      }),
      invalidatesTags: ['Slider'],
    }),

    updateSlider: builder.mutation({
      query: ({ sliderId, sliderData }) => ({
        url: `/sliders/${sliderId}`,
        method: 'PUT',
        body: sliderData,
      }),
      invalidatesTags: ['Slider'],
    }),

    deleteSlider: builder.mutation({
      query: (sliderId) => ({
        url: `/sliders/${sliderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Slider'],
    }),

    toggleSliderStatus: builder.mutation({
      query: (sliderId) => ({
        url: `/sliders/${sliderId}/status`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Slider'],
    }),

    reorderSliders: builder.mutation({
      query: (sliderOrder) => ({
        url: '/sliders/reorder',
        method: 'PATCH',
        body: sliderOrder,
      }),
      invalidatesTags: ['Slider'],
    }),

    // Add slider stats endpoint
    getSliderStats: builder.query({
      query: () => '/sliders/stats',
      providesTags: ['Slider'],
    }),

    getSliderPerformance: builder.query({
      query: () => '/sliders/performance',
      providesTags: ['Slider'],
    }),
  }),

});

export const {
  useGetActiveSlidersQuery,
  useGetAllSlidersQuery,
  useGetSliderByIdQuery,
  useCreateSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
  useToggleSliderStatusMutation,
  useReorderSlidersMutation,
  useGetSliderStatsQuery,
  useGetSliderPerformanceQuery,
} = sliderService;