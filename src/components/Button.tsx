import React from 'react';
import {Text} from 'react-native';
import {customStyles} from '../constants/styles';
import {OnPressAnimation} from '../Animations/ScaleAnimation';

const Button = (props: {
  onPress: () => void;
  title: string;
  btnStyle?: Object;
}): JSX.Element => {
  return (
    <OnPressAnimation
      key={''}
      reset={() => {}}
      onLongPress={() => {}}
      btnStyle={{}}
      onPress={() => {
        console.log('Pressed');
      }}>
      <Text style={[customStyles.btnText]}>{props.title}</Text>
    </OnPressAnimation>
  );
};

export default Button;
