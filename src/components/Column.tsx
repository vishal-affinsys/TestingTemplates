import React from 'react';
import {View, StyleSheet} from 'react-native';

const Column = (props: {
  children: JSX.Element;
  style?: Object;
}): JSX.Element => {
  return <View style={[styles.body, props.style]}>{props.children}</View>;
};
const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
  },
});
export default Column;
