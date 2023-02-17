import {StyleSheet} from 'react-native';
import {StatusBar, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const Colors = {
  primary: 'rgba(120,80,140,1)',
  secondary: 'rgba(140,80,120,1)',
  accent: 'rgba(120,80,140, 0.5)',
  backgroundColor: 'rgba(245,245,245,1)',
  shadowColor: 'rgba(25,25,25,1)',
  errorColor: 'rgba(123,23,44,0.6)',
  btnText: 'rgba(240,240,240,1)',
  textColor: 'rgba(40,40,40,1)',
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: Colors.primary,
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: Colors.primary,
    background: 'rgb(40, 40, 40)',
    card: 'rgb(0, 0, 0)',
    text: 'rgb(240, 240, 240)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const ScreenLayout = {
  height: height,
  width: width,
  statusBarHeight: StatusBar.currentHeight,
};

export const customStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    // paddingTop: ScreenLayout.statusBarHeight,
  },
  card: {
    elevation: 4,
    backgroundColor: 'white',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowRadius: 12,
    shadowOpacity: 0.23,
  },
  btnStyle: {
    backgroundColor: Colors.errorColor,
    padding: 12,
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  btnText: {
    color: Colors.btnText,
    fontWeight: 'bold',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});
