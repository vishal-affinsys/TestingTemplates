import React, {Dispatch, SetStateAction} from 'react';
import {View} from 'react-native';
import {ScreenLayout} from '../constants/styles';
import {randomChoice} from '../helpers/Images';
import FastImage from 'react-native-fast-image';
import {OnPressAnimation} from '../Animations/ScaleAnimation';

const width = ScreenLayout.width / 3 - 3;
const layout: string[] = ['row', 'row-reverse'];

const Image = (props: {
  width: number;
  height: number;
  image: string;
  item: any;
  setScale: Dispatch<SetStateAction<{image: null | string}>>;
  backDrop: string;
}): JSX.Element => {
  // const backgroundColor: string = getRandomColor();
  return (
    <OnPressAnimation
      reset={(): void => {}}
      btnStyle={{padding: 0, margin: 1, backgroundColor: props.backDrop}}
      onLongPress={() => {
        props.setScale({image: props.image});
      }}
      onPress={(): void => {}}>
      <FastImage
        style={{
          width: props.width,
          height: props.height,
          padding: 1,
          borderRadius: 8,
        }}
        source={{
          uri: props.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </OnPressAnimation>
  );
};
const TypeOne = React.memo(
  (props: {
    item: any;
    setScale: Dispatch<SetStateAction<{image: null | string}>>;
  }): JSX.Element => {
    const val = randomChoice(layout);
    return (
      // @ts-ignore
      <View style={{flexDirection: val}}>
        <View>
          <Image
            key={props.item[0].id}
            item={props.item}
            width={width}
            height={width}
            image={props.item[0].src.large2x}
            backDrop={props.item.avg_color}
            setScale={props.setScale}
          />
          <Image
            key={props.item[1].id}
            width={width}
            item={props.item}
            height={width}
            image={props.item[1].src.large2x}
            backDrop={props.item.avg_color}
            setScale={props.setScale}
          />
        </View>
        <Image
          key={props.item[2].id}
          item={props.item}
          width={width * 2}
          height={width * 2}
          image={props.item[2].src.large2x}
          backDrop={props.item.avg_color}
          setScale={props.setScale}
        />
      </View>
    );
  },
);

const TypeTwo = React.memo(
  (props: {
    item: any;
    setScale: Dispatch<SetStateAction<{image: null | string}>>;
  }): JSX.Element => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          key={props.item[0].id}
          item={props.item}
          width={width}
          height={width}
          image={props.item[0].src.large2x}
          backDrop={props.item.avg_color}
          setScale={props.setScale}
        />
        <Image
          key={props.item[1].id}
          width={width}
          item={props.item}
          height={width}
          setScale={props.setScale}
          image={props.item[1].src.large2x}
          backDrop={props.item.avg_color}
        />
        <Image
          key={props.item[2].id}
          width={width}
          item={props.item}
          height={width}
          image={props.item[2].src.large2x}
          backDrop={props.item.avg_color}
          setScale={props.setScale}
        />
      </View>
    );
  },
);

const TypeThree = React.memo(
  (props: {
    item: any;
    setScale: Dispatch<SetStateAction<{image: null | string}>>;
  }): JSX.Element => {
    const ley = randomChoice(layout);
    // @ts-ignore
    return (
      // @ts-ignore
      <View testID={'5imagesStack'} style={{flexDirection: ley}}>
        <View>
          <Image
            key={props.item[0].id}
            item={props.item}
            width={width}
            height={width}
            image={props.item[0].src.large2x}
            backDrop={props.item.avg_color}
            setScale={props.setScale}
          />
          <Image
            key={props.item[1].id}
            item={props.item}
            width={width}
            height={width}
            image={props.item[1].src.large2x}
            backDrop={props.item.avg_color}
            setScale={props.setScale}
          />
        </View>
        <View>
          <Image
            key={props.item[2].id}
            width={width}
            height={width}
            item={props.item}
            image={props.item[2].src.large2x}
            backDrop={props.item.avg_color}
            setScale={props.setScale}
          />
          <Image
            key={props.item[3].id}
            width={width}
            item={props.item}
            height={width}
            backDrop={props.item.avg_color}
            image={props.item[3].src.large2x}
            setScale={props.setScale}
          />
        </View>
        <Image
          key={props.item[4].id}
          width={width}
          item={props.item}
          height={width * 2}
          backDrop={props.item.avg_color}
          image={props.item[4].src.large2x}
          setScale={props.setScale}
        />
      </View>
    );
  },
);

export {TypeOne, TypeTwo, TypeThree};
