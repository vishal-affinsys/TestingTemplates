import {createSlice} from '@reduxjs/toolkit';
import {ImageObject} from '../Models/ImageModel';

export interface Initial {
  imageData: ImageObject | null;
  isVisible: boolean;
}

const initialData = {
  imageData: {},
  isVisible: false,
} as Initial;

export const imageSlice = createSlice({
  name: 'imageSlice',
  initialState: initialData,
  reducers: {
    setImageData: (
      state,
      action: {payload: ImageObject; type: string},
    ): void => {
      state.imageData = action.payload;
      state.isVisible = true;
    },
    resetImageData: state => {
      state.imageData = null;
      state.isVisible = false;
    },
  },
});

export const setImage = imageSlice.actions.setImageData;
export const resetImage = imageSlice.actions.resetImageData;
