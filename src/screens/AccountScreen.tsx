import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingTile from '../components/SettingTile';

const AccountScreen = (): JSX.Element => {
  return (
    <View>
      <View style={style.tileContainer}>
        <View style={style.iconContainer}>
          <Icon name="person" size={40} color={'grey'} />
        </View>
        <View style={style.tileContent}>
          <Text style={style.titleStyle}>Vishal Singh</Text>
          <Text style={style.phoneStyle}>7084324572</Text>
        </View>
      </View>

      <SettingTile leadingIcon="contrast-outline" title="Theme" />
    </View>
  );
};
export default AccountScreen;

const style = StyleSheet.create({
  tileContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {height: 12, width: 0},
    elevation: 3,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowOpacity: 0.23,
    shadowRadius: 23,
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(230,230,230,1)',
    padding: 12,
    borderRadius: 50,
    alignSelf: 'flex-start',
    margin: 4,
  },
  titleStyle: {
    color: 'black',
    fontWeight: '800',
    letterSpacing: 2,
    fontSize: 18,
  },
  phoneStyle: {
    color: 'rgba(150,150,150,1)',
    letterSpacing: 0.1,
    fontSize: 12,
  },
  tileContent: {
    marginHorizontal: 12,
  },
});
