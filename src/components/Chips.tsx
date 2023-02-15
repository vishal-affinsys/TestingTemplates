import React from 'react';
import {Animated, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const Chips = (props: {item: any; setState: any; setSearch: any}) => {
  const aura = React.useRef(new Animated.Value(1)).current;
  const touch = Animated.spring(aura, {
    toValue: 0.95,
    useNativeDriver: true,
    friction: 4,
  });
  return (
    <Pressable
      onPress={() => {
        touch.start(() => {
          touch.reset();
        });
        props.setState({name: props.item.word});
        props.setSearch(props.item.word);
      }}>
      <Animated.View style={[chipStyle.body, {transform: [{scale: aura}]}]}>
        <Text style={chipStyle.textStyle} variant={'bodySmall'}>
          {props.item.word}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const ChipBuilder = (props: {setState: any; tags: any; setSearch: any}) => {
  return (
    <View style={chipStyle.builder}>
      {props.tags.map((ele: any) => {
        return (
          <Chips
            key={ele.word}
            item={ele}
            setState={props.setState}
            setSearch={props.setSearch}
          />
        );
      })}
    </View>
  );
};

const chipStyle = StyleSheet.create({
  body: {
    margin: 4,
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 5,
    alignSelf: 'flex-start',
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'black',
  },
  builder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black',
  },
});

export default ChipBuilder;
