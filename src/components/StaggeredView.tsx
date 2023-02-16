import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenLayout} from '../constants/styles';
import {randomChoice} from '../helpers/Images';
import FastImage from 'react-native-fast-image';
import {OnPressAnimation} from '../Animations/ScaleAnimation';
import {useDispatch} from 'react-redux';
import {setImage} from '../store/ImageData';
import {ImageObject} from '../Models/ImageModel';

const width = ScreenLayout.width / 3 - 3;
const layout: string[] = ['row', 'row-reverse'];

const ImageContainer = (props: {
  item: ImageObject[];
  index: number;
  variant: '0x' | '1x' | '2x';
}): JSX.Element => {
  const imageLayout = {
    '0x': {height: width, width: width},
    '1x': {height: 2 * width, width: width},
    '2x': {height: 2 * width, width: 2 * width},
  };
  const content: ImageObject = props.item[props.index];
  return (
    <Image
      key={content.id}
      item={content}
      width={imageLayout[props.variant].width}
      height={imageLayout[props.variant].height}
    />
  );
};

const Image = (props: {
  width: number;
  height: number;
  item: ImageObject;
}): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <OnPressAnimation
      reset={(): void => {}}
      btnStyle={[style.btnStyle, {backgroundColor: props.item.avg_color}]}
      onLongPress={(): void => {
        dispatch(setImage(props.item));
      }}
      onPress={(): void => {}}>
      <FastImage
        style={[{width: props.width, height: props.height}, style.imageStyle]}
        source={{
          uri: props.item.src.large2x,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </OnPressAnimation>
  );
};
const TypeOne = React.memo((props: {item: ImageObject[]}): JSX.Element => {
  const val = randomChoice(layout);
  return (
    // @ts-ignore
    <View style={{flexDirection: val}}>
      <View>
        <ImageContainer index={0} item={props.item} variant={'0x'} />
        <ImageContainer index={1} item={props.item} variant={'0x'} />
      </View>
      <ImageContainer index={2} item={props.item} variant={'2x'} />
    </View>
  );
});

const TypeTwo = React.memo((props: {item: ImageObject[]}): JSX.Element => {
  return (
    <View style={style.layout}>
      <ImageContainer index={0} item={props.item} variant={'0x'} />
      <ImageContainer index={1} item={props.item} variant={'0x'} />
      <ImageContainer index={2} item={props.item} variant={'0x'} />
    </View>
  );
});

const TypeThree = React.memo((props: {item: ImageObject[]}): JSX.Element => {
  const ley = randomChoice(layout);
  // @ts-ignore
  return (
    // @ts-ignore
    <View testID={'5imagesStack'} style={{flexDirection: ley}}>
      <View>
        <ImageContainer index={0} item={props.item} variant={'0x'} />
        <ImageContainer index={1} item={props.item} variant={'0x'} />
      </View>
      <View>
        <ImageContainer index={2} item={props.item} variant={'0x'} />
        <ImageContainer index={3} item={props.item} variant={'0x'} />
      </View>
      <ImageContainer index={4} item={props.item} variant={'1x'} />
    </View>
  );
});

export {TypeOne, TypeTwo, TypeThree};
const style = StyleSheet.create({
  btnStyle: {
    padding: 0,
    margin: 1,
  },
  imageStyle: {
    padding: 1,
    borderRadius: 8,
  },
  layout: {flexDirection: 'row'},
});
