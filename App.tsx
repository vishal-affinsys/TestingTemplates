import React from 'react';
import ExploreScreen from './src/screens/ExploreScreen';
import {customStyles} from './src/constants/styles';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import Icons from 'react-native-vector-icons/AntDesign';
import AccountScreen from './src/screens/AccountScreen';

const Tab = createBottomTabNavigator();

const TabIcons = (
  props: {focused: boolean; color: string; size: number},
  name: string,
): JSX.Element => {
  return <Icons name={name} {...props} />;
};

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <View style={customStyles.body}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Explore">
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: props => TabIcons({...props}, 'home'),
                tabBarActiveTintColor: '#238472',
              }}
            />
            <Tab.Screen
              name="Explore"
              component={ExploreScreen}
              options={{
                tabBarIcon: props => TabIcons({...props}, 'find'),
                tabBarActiveTintColor: '#823748',
              }}
            />
            <Tab.Screen
              name="Profile"
              component={AccountScreen}
              options={{
                tabBarIcon: props => TabIcons({...props}, 'smileo'),
                tabBarActiveTintColor: '#294782',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
