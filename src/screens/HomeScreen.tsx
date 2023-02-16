/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {MD3Colors, ProgressBar, TextInput} from 'react-native-paper';
import ChipBuilder from '../components/Chips';
import ImageCard from '../components/ImageCard';
import useDebounce from '../helpers/UseDebounce';
import {useSearchedImagesQuery} from '../store/ImageReducer';
import {useGetWordsQuery} from '../store/Words';

const CHIPS_HEIGHT = 150;

const HomeScreen = () => {
  const scaling = React.useRef(new Animated.Value(0)).current;
  const [query, setState] = React.useState({name: 'Sunset'});
  const {currentData, isLoading} = useSearchedImagesQuery(query);
  const [chipsHeight, setChipsHeight] = React.useState(0);
  const words = useGetWordsQuery(query.name);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [0, CHIPS_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const translate = React.useRef(new Animated.Value(400)).current;

  const animate = Animated.spring(translate, {
    toValue: 0,
    friction: 8,
    useNativeDriver: true,
  });

  const animation = Animated.spring(scaling, {
    useNativeDriver: true,
    friction: 4,
    toValue: 1,
  });
  React.useEffect(() => {
    animation.start();
    animate.start();
    return (): void => {
      animation.reset();
      animate.reset();
    };
  }, []);

  const [search, setSearch] = React.useState(query.name);

  useDebounce(
    (): void => {
      setState({name: search});
    },
    [search],
    2000,
  );
  return (
    <Animated.View style={style.body}>
      <View style={style.inputContainer}>
        <TextInput
          cursorColor={'white'}
          onChangeText={text => {
            setSearch(text);
          }}
          value={search}
          placeholder={'Search'}
          theme={{colors: {primary: 'white'}}}
          activeOutlineColor={MD3Colors.primary99}
          placeholderTextColor={'white'}
          style={style.textInput}
          underlineColor={'transparent'}
        />
      </View>
      <ProgressBar
        indeterminate={true}
        style={style.progressBar}
        visible={isLoading || currentData === undefined}
      />
      <Animated.FlatList
        style={{transform: [{translateY: translate}], marginTop: 8}}
        contentContainerStyle={{paddingTop: chipsHeight + 10}}
        data={
          isLoading ? [] : currentData !== undefined ? currentData.photos : []
        }
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <ImageCard item={item} />;
        }}
      />
      <Animated.View
        onLayout={event => {
          console.log(event.nativeEvent.layout.height);
          setChipsHeight(event.nativeEvent.layout.height);
        }}
        style={[style.chipAnimation, {transform: [{scale: opacity}]}]}>
        <ChipBuilder
          setState={setState}
          setSearch={setSearch}
          tags={words.currentData === undefined ? [] : words.currentData}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default HomeScreen;
const style = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 5,
  },
  inputContainer: {
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    fontSize: 18,
  },
  chipAnimation: {
    position: 'absolute',
    top: 60,
    zIndex: 1000,
  },
  textInput: {
    backgroundColor: 'rgba(120,123,190, 0.4)',
    color: 'white',
    height: 40,
  },
  textStyle: {
    color: 'black',
    fontWeight: '900',
  },
  imageStyle: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 12,
  },
  progressBar: {
    marginTop: 8,
  },
});
