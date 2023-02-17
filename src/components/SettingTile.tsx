import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Easing,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Row from './Row';

interface ISettingTile {
  leadingIcon?: string | undefined;
  title?: string | undefined;
  configName?: string | undefined;
  children?: JSX.Element | undefined;
}

const Options = (props: {
  value: string;
  selected: string;
  onPress: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
  return (
    <Row style={style.rowStyle}>
      <Text style={style.optionsTile}>{props.value}</Text>
      <RadioButton
        value={props.value}
        onPress={(): void => {
          props.onPress(props.value);
        }}
        color="grey"
        uncheckedColor="grey"
        status={props.value === props.selected ? 'checked' : 'unchecked'}
      />
    </Row>
  );
};

const INITIAL_HEIGHT: number = 84;

const SettingTile = (props: ISettingTile): JSX.Element => {
  const height = React.useRef(new Animated.Value(INITIAL_HEIGHT)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;
  const [visible, setVisibility] = React.useState(true);

  const [value, setValue] = React.useState('Light');

  const rotate = height.interpolate({
    inputRange: [INITIAL_HEIGHT, 200],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  const fadeOut = Animated.timing(opacity, {
    toValue: 1,
    useNativeDriver: true,
    delay: 200,
    duration: 200,
    easing: Easing.circle,
  });

  const Animation = (val: number) =>
    Animated.spring(height, {
      toValue: val,
      friction: 20,
      useNativeDriver: false,
    });

  const expand = React.useRef(Animation(200));
  const contract = React.useRef(Animation(INITIAL_HEIGHT));

  const animate = (): void => {
    if (!visible) {
      expand.current.start();
      fadeOut.start();
      setVisibility(!visible);
    } else {
      setVisibility(!visible);
      fadeOut.reset();
      contract.current.start();
    }
  };

  return (
    <Animated.View style={[style.bodyTile, {height: height}]}>
      <Pressable onPress={animate}>
        <View style={style.innerContainer}>
          <View style={style.bodyTileLeft}>
            {props.leadingIcon === undefined ? null : (
              <Icon name={props.leadingIcon} size={30} color={'grey'} />
            )}
            <Text style={style.bodyTileTitle}>{props.title}</Text>
          </View>
          <View style={style.bodyTileLeft}>
            <Text style={style.bodyTileConfig}>{value}</Text>
            <Animated.View style={[{transform: [{rotateZ: rotate}]}]}>
              <Icon
                name={'caret-down-circle-outline'}
                size={30}
                color={'grey'}
              />
            </Animated.View>
          </View>
        </View>
      </Pressable>
      {visible ? (
        <Animated.View style={[style.footerSection, {opacity: opacity}]}>
          <Options value="Light" selected={value} onPress={setValue} />
          <Options value="Dark" selected={value} onPress={setValue} />
          <Options value="System default" selected={value} onPress={setValue} />
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};

const style = StyleSheet.create({
  bodyTile: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    paddingVertical: 24,
    shadowColor: 'black',
    shadowOffset: {height: 12, width: 0},
    elevation: 3,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowOpacity: 0.23,
    shadowRadius: 23,
    marginBottom: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bodyTileTitle: {
    color: 'black',
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 1,
  },
  bodyTileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyTileConfig: {
    color: 'black',
    fontWeight: '300',
    letterSpacing: 1,
    marginHorizontal: 12,
  },

  footerSection: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  optionsTile: {
    color: 'black',
    fontWeight: '300',
    letterSpacing: 0.1,
    fontSize: 16,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  rowStyle: {justifyContent: 'space-between', width: '100%'},
});

export default SettingTile;
