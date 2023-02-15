import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';

const ImageCard = (props: {item: any}): JSX.Element => {
  const item = props.item;
  return (
    <View style={[imageCard.container, {backgroundColor: item.avg_color}]}>
      <Image
        source={{
          uri: item.src.large2x,
        }}
        style={imageCard.imageStyle}
      />
      <View style={imageCard.footerSection}>
        <Text variant={'labelLarge'} style={imageCard.alt}>
          {item.alt}
        </Text>
        <Text variant={'labelSmall'} style={imageCard.photographerText}>
          Photographer ~ {item.photographer}
        </Text>
        {/*<Text>{JSON.stringify(item, null, 2)}</Text>*/}
      </View>
    </View>
  );
};

const imageCard = StyleSheet.create({
  container: {
    elevation: 4,
    shadowOffset: {height: 0, width: 0},
    shadowColor: 'black',
    shadowOpacity: 0.23,
    shadowRadius: 20,
    marginBottom: 20,
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageStyle: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 12,
  },
  alt: {
    color: 'white',
    fontWeight: 'bold',
  },
  photographerText: {
    color: 'rgba(200,230,230,1)',
    fontWeight: '300',
  },
  footerSection: {
    padding: 8,
  },
});

export default ImageCard;
