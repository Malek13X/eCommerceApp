import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// import { docsApi } from '../services/docs';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/user/authSlice';
import UIReducer from '../features/UISlice';

export const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      UI: UIReducer
   },

   // Adding the api middleware enables caching, invalidation, polling,
   // and other useful features of `rtk-query`.
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
