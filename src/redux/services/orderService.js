import { apiSlice } from './api';

export const orderService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // User endpoints
    getUserOrders: builder.query({
      query: () => '/orders/user/my-orders',
      providesTags: ['Order'],
    }),

    getOrderByOrderNumber: builder.query({
      query: (orderNumber) => `/orders/order-number/${orderNumber}`,
      providesTags: (result, error, orderNumber) => [{ type: 'Order', orderNumber }],
    }),

    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: '/orders/initiate-payment',
        method: 'POST',
        body: paymentData,
      }),
    }),

    createCODOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders/create-cod-order',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),

    checkPaymentStatus: builder.query({
      query: (merchantTransactionId) => 
        `/orders/payment-status/${merchantTransactionId}`,
    }),

    calculateOrderTotals: builder.mutation({
      query: (orderData) => ({
        url: '/orders/calculate-totals',
        method: 'POST',
        body: orderData,
      }),
    }),

    // Admin endpoints
    getAllOrders: builder.query({
      query: (params = {}) => ({
        url: '/orders/admin',
        params,
      }),
      providesTags: ['Order'],
    }),

    getOrderById: builder.query({
      query: (orderId) => `/orders/admin/${orderId}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/admin/${orderId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),

    updateTrackingInfo: builder.mutation({
      query: ({ orderId, trackingInfo }) => ({
        url: `/orders/admin/${orderId}/tracking`,
        method: 'PATCH',
        body: trackingInfo,
      }),
      invalidatesTags: ['Order'],
    }),

    processRefund: builder.mutation({
      query: ({ orderId, refundData }) => ({
        url: `/orders/admin/${orderId}/refund`,
        method: 'POST',
        body: refundData,
      }),
      invalidatesTags: ['Order'],
    }),

    getOrderStats: builder.query({
      query: () => '/orders/admin/stats',
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useGetOrderByOrderNumberQuery,
  useInitiatePaymentMutation,
  useCreateCODOrderMutation,
  useCheckPaymentStatusQuery,
  useCalculateOrderTotalsMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useUpdateTrackingInfoMutation,
  useProcessRefundMutation,
  useGetOrderStatsQuery,
} = orderService;