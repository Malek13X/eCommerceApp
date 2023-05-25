import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './app/store';
import { itemsApi } from './features/items/itemApi';

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
               <ApiProvider api={itemsApi}>
                  <App />
               </ApiProvider>
            </Provider>
         );
      });
} else {
   root.render(
      <ApiProvider api={itemsApi}>
         <Provider store={store}>
            <App />
         </Provider>
      </ApiProvider>
   );
}
