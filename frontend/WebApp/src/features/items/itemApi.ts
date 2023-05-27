import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { INewItem, Item } from '../../services/types';
import { RootState } from '../../app/store';
export const itemsApi = createApi({
   reducerPath: 'items',
   baseQuery: fetchBaseQuery({
      baseUrl: '/api',
      prepareHeaders: (headers, { getState }) => {
         const state = getState() as RootState;
         const token = state.auth.user.token;

         if (token) {
            headers.set('Authorization', `Bearer ${token}`);
         }

         // Remove the 'Content-Type' header as it will be set automatically by 'FormData'
         return headers;
      }
   }),
   tagTypes: ['Item'],
   endpoints: (builder) => ({
      getItems: builder.query<Item[], string>({
         query: (search) => {
            return {
               url: '/items',
               params: { search }
            };
         }
      }),
      addItem: builder.mutation<void, INewItem>({
         query: (item) => {
            const formData = new FormData();
            if (item.image) {
               formData.append('image', item.image);
            }

            formData.append('title', item.title);
            formData.append('description', item.description);
            formData.append('categories', JSON.stringify(item.categories));
            formData.append('price', String(item.price));
            formData.append('quantity', String(item.quantity));

            return {
               url: '/items',
               method: 'POST',
               body: formData
            };
         }
      }),
      editItem: builder.mutation<Item, Partial<Item> & Pick<Item, '_id'>>({
         query: (item) => ({
            url: `/items/${item._id}`,
            method: 'PUT',
            body: JSON.stringify({
               title: item.title,
               description: item.description,
               categories: item.categories,
               price: item.price,
               quantity: item.quantity
            }),
            headers: {
               'Content-Type': 'application/json'
            }
         })
      }),
      deleteItem: builder.mutation<Item, string>({
         query: (itemId) => ({
            url: `/items/${itemId}`,
            method: 'DELETE'
         })
      })
   })
});

export const {
   useGetItemsQuery,
   useDeleteItemMutation,
   useAddItemMutation,
   useEditItemMutation
} = itemsApi;
