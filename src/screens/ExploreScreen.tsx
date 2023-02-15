/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useGetImagesQuery} from '../store/ImageReducer';
import {TypeOne, TypeThree, TypeTwo} from '../components/StaggeredView';
import {ScreenLayout} from '../constants/styles';
import {ScaleAnimation} from '../Animations/ScaleAnimation';

const ExploreScreen = (): JSX.Element => {
  const [params, setParams] = React.useState({perPage: 53, page: 1});
  const [scale, setScale] = React.useState<{image: string | null}>({
    image: null,
  });
  const data = useGetImagesQuery(params);

  const renderItem = React.useCallback(
    (props: {item: any; index: number}) => {
      if (props.item.length === 5) {
        return <TypeThree item={props.item} setScale={setScale} />;
      }
      if (props.index === 0 && props.item.length !== 5) {
        return <TypeOne item={props.item} setScale={setScale} />;
      }
      if (props.index % 3 === 0) {
        return <TypeOne item={props.item} setScale={setScale} />;
      } else {
        return <TypeTwo item={props.item} setScale={setScale} />;
      }
    },
    [setScale],
  );

  return (
    <View style={[style.container]}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Pressable
        style={[
          {
            display: scale.image === null ? 'none' : 'flex',
          },
          style.press,
        ]}
        onPress={() => {
          setScale({image: null});
        }}>
        <View>
          {scale.image !== null ? (
            <ScaleAnimation>
              <Image source={{uri: scale.image}} style={style.imageStyle} />
            </ScaleAnimation>
          ) : (
            <View />
          )}
        </View>
      </Pressable>
      <FlatList
        data={data.currentData === undefined ? [] : data.currentData}
        keyExtractor={item => item[0].id}
        maxToRenderPerBatch={3}
        contentContainerStyle={{
          opacity: scale.image === null ? 1 : 0.4,
          backgroundColor: scale.image !== null ? 'black' : 'white',
        }}
        onEndReached={(): void => {
          setParams(prevState => {
            return {page: prevState.page + 1, perPage: 53};
          });
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ExploreScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    height: ScreenLayout.height,
    width: ScreenLayout.width,
  },
  imageStyle: {
    height: ScreenLayout.height / 2,
    width: ScreenLayout.width * 0.8,
    borderRadius: 12,
    opacity: 1,
  },
  press: {
    position: 'absolute',
    height: ScreenLayout.height,
    aspectRatio: 0.9,
    zIndex: 1,
  },
});
