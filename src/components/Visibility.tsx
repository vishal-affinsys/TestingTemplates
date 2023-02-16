import React from 'react';
import {View} from 'react-native';
import {ScaleAnimation} from '../Animations/ScaleAnimation';
import ImageCard from './ImageCard';

const Visibility = (props: {
  isVisible: boolean;
  imageData: any;
}): JSX.Element => {
  return (
    <View>
      {props.isVisible ? (
        <ScaleAnimation>
          <ImageCard item={props.imageData} />
        </ScaleAnimation>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Visibility;
