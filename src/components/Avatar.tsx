import React from 'react';
import {Image, View} from 'react-native';
import {customStyles} from '../constants/styles';

const Avatar = (props: {image: string}): JSX.Element => {
  return (
    <View key={props.image + Math.random()}>
      <Image source={{uri: props.image}} style={customStyles.avatar} />
    </View>
  );
};

export default Avatar;
