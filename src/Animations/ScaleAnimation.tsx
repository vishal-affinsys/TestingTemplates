import React from 'react';
import {Animated, Pressable, View} from 'react-native';
import {customStyles, ScreenLayout} from '../constants/styles';

const ScaleAnimation = React.memo((props: {children: JSX.Element}) => {
  const scale = React.useRef(new Animated.Value(0)).current;
  const animation = Animated.spring(scale, {
    toValue: 1,
    friction: 7,
    useNativeDriver: true,
  });

  React.useEffect(() => {
    animation.start();
    return () => {
      animation.reset();
    };
  });
  return (
    <Animated.View style={[{transform: [{scale: scale}]}]}>
      <View>
        <View
          style={{
            height: ScreenLayout.height,
            width: ScreenLayout.width,
            position: 'absolute',
            backgroundColor: 'black',
            opacity: 0.5,
          }}
        />
        <View
          style={{
            height: ScreenLayout.height,
            width: ScreenLayout.width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props.children}
        </View>
      </View>
    </Animated.View>
  );
});

const OnPressAnimation = (props: {
  children: JSX.Element;
  btnStyle: Object;
  onPress: () => void;
  onLongPress: () => void;
  reset: () => void;
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const animation = (val: number) =>
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
        onPressIn={() => {
          pressIn.current.start();
        }}
        onPressOut={() => {
          pressIn.current.reset();
          props.reset();
        }}
        onLongPress={() => {
          props.onLongPress();
        }}
        cancelable={true}
        delayLongPress={100}
        onPress={() => {
          stagger.start(() => {
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
