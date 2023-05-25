import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewItem, Item } from '../../services/types';
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

         headers.set('Content-Type', 'application/json');
         return headers;
      }
   }),
   tagTypes: ['Item'],
   endpoints: (builder) => ({
      getItems: builder.query<Item[], string>({
         query: (search) => {
            return {
               url: `/items`,
               params: { search }
            };
         }
      }),
      addItem: builder.mutation<NewItem, NewItem>({
         query: (item: NewItem) => {
            const formData = new FormData();
            formData.append('title', item.title);
            formData.append('description', item.description);
            formData.append('categories', JSON.stringify(item.categories));
            formData.append('price', item.price.toString());
            formData.append('quantity', item.quantity.toString());
            item.image ? formData.append('image', item.image) : null;

            return {
               url: '/items',
               method: 'POST',
               body: formData,
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
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

               // imageUrl: item.imageUrl,
               // imageUUDI: item.imageUUID
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
