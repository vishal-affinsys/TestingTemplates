import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {imageSlice} from './ImageData';
import {images, imagesApi} from './ImageReducer';
import {words} from './Words';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    [imagesApi.reducerPath]: imagesApi.reducer,
    [images.reducerPath]: images.reducer,
    [words.reducerPath]: words.reducer,
    image: imageSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      imagesApi.middleware,
      images.middleware,
      words.middleware,
    ]),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
