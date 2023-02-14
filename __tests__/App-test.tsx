import {renderWithProviders} from '../src/TestUtils/Utils/provider';
import ExploreScreen from '../src/screens/ExploreScreen';
import {store} from '../src/store/store';
import React from 'react';

describe('Rendering login screen and lookin for images to get rendered', () => {
  test('<Explore Screen />', () => {
    const {getAllByTestId} = renderWithProviders(<ExploreScreen />, {
      store: store,
    });
    expect(getAllByTestId('5imagesStack').length).toBe(4);
  });
});
