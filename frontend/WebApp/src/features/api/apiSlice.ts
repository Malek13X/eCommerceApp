import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cart, INewItem, INewOrder, Item, Order } from '../../services/types';
import { RootState } from '../../app/store';

export const apiSlice = createApi({
   reducerPath: 'api',

   baseQuery: fetchBaseQuery({
      baseUrl: '/api',
      prepareHeaders: (headers, { getState }) => {
         const state = getState() as RootState;
         const token = state.auth.user?.token;

         if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
         }
      }
   }),
   tagTypes: ['Item', 'Cart', 'Order'],

   endpoints: (builder) => ({
      getItems: builder.query<Item[], string>({
         query: (search) => {
            return {
               url: '/items',
               method: 'GET',
               params: { search }
            };
         },
         providesTags: ['Item']
      }),
      addItem: builder.mutation<void, INewItem>({
         query: (item) => {
            const formData = new FormData();
            if (item.image) {
               formData.append('image', item.image);
            }

            formData.append('title', item.title);
            formData.append('description', item.description);
            formData.append('category', item.category);
            formData.append('price', String(item.price));
            formData.append('quantity', String(item.quantity));

            return {
               url: '/items',
               method: 'POST',
               body: formData
            };
         },
         invalidatesTags: ['Item']
      }),

      editItem: builder.mutation<Item, Item>({
         query: (item) => ({
            url: `/items/${item._id}`,
            method: 'PUT',
            body: JSON.stringify({
               title: item.title,
               description: item.description,
               category: item.category,
               price: item.price,
               quantity: item.quantity
            }),
            headers: {
               'Content-Type': 'application/json'
            }
         }),
         invalidatesTags: ['Item']
      }),

      deleteItem: builder.mutation<Item, string>({
         query: (itemId) => ({
            url: `/items/${itemId}`,
            method: 'DELETE'
         }),
         invalidatesTags: ['Item']
      }),

      createCart: builder.mutation<Cart, void>({
         query: () => ({
            url: `/cart/`,
            method: 'POST'
         }),
         invalidatesTags: ['Cart']
      }),

      getCart: builder.query<Cart, void>({
         query: () => {
            return {
               url: '/cart'
            };
         },
         providesTags: ['Cart']
      }),

      addItemToCart: builder.mutation<
         void,
         { itemId: string; quantity: number }
      >({
         query: ({ itemId, quantity }) => {
            return {
               url: `/cart/items/${itemId}`,
               method: 'PUT',
               body: { quantity }
            };
         }
      }),

      removeItemFromCart: builder.mutation<void, string>({
         query: (itemId) => {
            return {
               url: `/cart/items/${itemId}`,
               method: 'DELETE'
            };
         }
      }),
      removeAllItemsFromCart: builder.mutation<void, void>({
         query: () => {
            return {
               url: `/cart/items/`,
               method: 'DELETE'
            };
         }
      }),
      createOrder: builder.mutation<void, INewOrder>({
         query: (order) => ({
            url: '/orders',
            method: 'POST',
            body: order
         }),
         invalidatesTags: ['Order']
      }),

      getOrderById: builder.query<Order, string>({
         query: (orderId) => ({
            url: `/orders/${orderId}`
         }),
         providesTags: ['Order']
      }),
      getAllOrders: builder.query<Order[], string>({
         query: (userId) => ({
            url: `/orders/user/${userId}`,
            method: 'GET'
         }),
         providesTags: ['Order']
      })
   })
});

export const {
   useGetItemsQuery,
   useDeleteItemMutation,
   useAddItemMutation,
   useEditItemMutation,
   useCreateCartMutation,
   useGetCartQuery,
   useAddItemToCartMutation,
   useRemoveItemFromCartMutation,
   useRemoveAllItemsFromCartMutation,
   useCreateOrderMutation,
   useGetOrderByIdQuery,
   useGetAllOrdersQuery
} = apiSlice;
