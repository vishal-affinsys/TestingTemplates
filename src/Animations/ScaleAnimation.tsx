import React from 'react';
import {Animated, Pressable, StyleSheet, View} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {customStyles, ScreenLayout} from '../constants/styles';
import {options} from '../helpers/HapticFeed';

const ScaleAnimation = React.memo((props: {children: JSX.Element}) => {
  const scale = React.useRef(new Animated.Value(0)).current;
  const animation = Animated.spring(scale, {
    toValue: 1,
    friction: 7,
    useNativeDriver: true,
  });

  React.useEffect((): (() => void) => {
    animation.start();
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    return animation.reset;
  });
  return (
    <View>
      <View style={style.backdrop} />
      <Animated.View style={[{transform: [{scale: scale}]}]}>
        <View style={style.content}>{props.children}</View>
      </Animated.View>
    </View>
  );
});

const style = StyleSheet.create({
  backdrop: {
    height: ScreenLayout.height,
    width: ScreenLayout.width,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.8,
  },
  content: {
    height: ScreenLayout.height,
    width: ScreenLayout.width,
    justifyContent: 'center',
    zIndex: 1,
    alignItems: 'center',
  },
});

const OnPressAnimation = (props: {
  children: JSX.Element;
  btnStyle: Object;
  onPress: () => void;
  onLongPress: () => void;
  reset: () => void;
}): JSX.Element => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const animation = (val: number): Animated.CompositeAnimation =>
    Animated.spring(scale, {
      toValue: val,
      friction: 4,
      useNativeDriver: true,
    });

  const stagger = Animated.stagger(50, [animation(0.95), animation(1)]);
  const pressIn = React.useRef(animation(0.95));

  return (
    <Animated.View style={[{transform: [{scale: scale}]}]}>
      <Pressable
        style={[customStyles.btnStyle, props.btnStyle]}
        onPressIn={(): void => {
          pressIn.current.start();
        }}
        onPressOut={(): void => {
          pressIn.current.reset();
          props.reset();
        }}
        onLongPress={(): void => {
          props.onLongPress();
        }}
        cancelable={true}
        delayLongPress={100}
        onPress={(): void => {
          stagger.start((): void => {
            stagger.reset();
          });
          props.onPress();
        }}>
        {props.children}
      </Pressable>
    </Animated.View>
  );
};

export {OnPressAnimation, ScaleAnimation};
