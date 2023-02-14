import {configureStore} from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import {setupListeners} from '@reduxjs/toolkit/query';
import {imagesApi} from './ImageReducer';

export const store = configureStore({
  reducer: {
    [imagesApi.reducerPath]: imagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(imagesApi.middleware),
});
setupListeners(store.dispatch);
