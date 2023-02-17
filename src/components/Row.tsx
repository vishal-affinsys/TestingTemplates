import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

const Row = (props: {
  children: JSX.Element[];
  style?: StyleProp<ViewStyle>;
}): JSX.Element => {
  return <View style={[styles.body, props.style]}>{props.children}</View>;
};
const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
  },
});
export default Row;
