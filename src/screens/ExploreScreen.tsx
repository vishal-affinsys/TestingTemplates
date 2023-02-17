/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {useGetImagesQuery} from '../store/ImageReducer';
import {TypeOne, TypeThree, TypeTwo} from '../components/StaggeredView';
import {ScreenLayout} from '../constants/styles';
import {resetImage} from '../store/ImageData';
import Visibility from '../components/Visibility';
import {ImageObject} from '../Models/ImageModel';
import {useAppSelector, useAppDispatch} from '../store/store';
import {useTheme} from '@react-navigation/native';

const ExploreScreen = (): JSX.Element => {
  const [params, setParams] = React.useState({perPage: 53, page: 1});
  const data = useGetImagesQuery(params);
  const imageData = useAppSelector(state => state.image);
  const dispatch = useAppDispatch();
  const renderItem = React.useCallback(
    (props: {item: ImageObject[]; index: number}): JSX.Element => {
      if (props.item.length === 5) {
        return <TypeThree item={props.item} />;
      }
      if (props.index === 0 && props.item.length !== 5) {
        return <TypeOne item={props.item} />;
      }
      if (props.index % 3 === 0) {
        return <TypeOne item={props.item} />;
      } else {
        return <TypeTwo item={props.item} />;
      }
    },
    [],
  );

  const Theme = useTheme();

  return (
    <View style={[style.container]}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={Theme.dark ? 'light-content' : 'dark-content'}
      />
      <Pressable
        style={[
          {
            display: imageData.isVisible ? 'flex' : 'none',
          },
          style.press,
        ]}
        onPress={(): void => {
          dispatch(resetImage());
        }}>
        <Visibility
          isVisible={imageData.isVisible}
          imageData={imageData.imageData}
        />
      </Pressable>
      <FlatList
        data={data.currentData === undefined ? [] : data.currentData}
        keyExtractor={(item: ImageObject[]): string => item[0].id.toString()}
        maxToRenderPerBatch={3}
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
    flex: 1,
    zIndex: 1,
  },
});
