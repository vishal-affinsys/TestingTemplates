import {createSlice} from '@reduxjs/toolkit';
import {ImageObject} from '../Models/ImageModel';

const initialData = {
  imageData: {},
  isVisible: false,
};

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
      state.imageData = {};
      state.isVisible = false;
    },
  },
});

export const setImage = imageSlice.actions.setImageData;
export const resetImage = imageSlice.actions.resetImageData;
