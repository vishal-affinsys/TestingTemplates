import {createSlice} from '@reduxjs/toolkit';
import {DarkTheme, LightTheme} from '../constants/styles';

interface ThemeObject {
  theme: typeof LightTheme;
  status: 'Light' | 'Dark' | 'System default';
}
const initialState = {
  theme: DarkTheme,
  status: 'Dark',
} as ThemeObject;

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    setTheme: (state, action: {payload: string; type: string}): void => {
      switch (action.payload) {
        case 'Light':
          state.theme = LightTheme;
          state.status = 'Light';
          break;
        case 'Dark':
          state.theme = DarkTheme;
          state.status = 'Dark';
          break;
        case 'System default':
          state.status = 'System default';
          break;
      }
    },
  },
});

export const setTheme = ThemeSlice.actions.setTheme;
