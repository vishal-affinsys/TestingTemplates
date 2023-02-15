import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {images, imagesApi} from './ImageReducer';
import {words} from './Words';

export const store = configureStore({
  reducer: {
    [imagesApi.reducerPath]: imagesApi.reducer,
    [images.reducerPath]: images.reducer,
    [words.reducerPath]: words.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      imagesApi.middleware,
      images.middleware,
      words.middleware,
    ]),
});
setupListeners(store.dispatch);
