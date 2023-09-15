import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './app/store';
import { apiSlice } from './features/api/apiSlice';

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLDivElement
);

if (process.env.NODE_ENV !== 'development') {
   import('../mocks/browser')
      .then(({ worker }) => {
         worker.start();
      })
      .then(() => {
         root.render(
            <Provider store={store}>
               <ApiProvider api={apiSlice}>
                  <App />
               </ApiProvider>
            </Provider>
         );
      });
} else {
   root.render(
      <ApiProvider api={apiSlice}>
         <Provider store={store}>
            <App />
         </Provider>
      </ApiProvider>
   );
}
