import React, {PropsWithChildren} from 'react';
import {render} from '@testing-library/react-native';
import type {RenderOptions} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import type {PreloadedState} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {imagesApi} from '../../store/ImageReducer';
import {store} from '../../store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store: typeof store;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        [imagesApi.reducerPath]: imagesApi.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(imagesApi.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions,
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
