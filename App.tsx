import React from 'react';
import ExploreScreen from './src/screens/ExploreScreen';
import {customStyles, DarkTheme, LightTheme} from './src/constants/styles';
import {Provider} from 'react-redux';
import {store, useAppDispatch, useAppSelector} from './src/store/store';

import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import Icons from 'react-native-vector-icons/AntDesign';
import AccountScreen from './src/screens/AccountScreen';
import {getData, KEYS} from './src/helpers/CacheManager';
import {setTheme} from './src/store/ThemeReducer';

const Tab = createBottomTabNavigator();

const TabIcons = (
  props: {focused: boolean; color: string; size: number},
  name: string,
): JSX.Element => {
  return <Icons name={name} {...props} />;
};

const RootContainer = (): JSX.Element => {
  const ThemeRdx = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const scheme = useColorScheme();

  React.useEffect((): void => {
    async function getTheme(): Promise<void> {
      const theme = await getData(KEYS.Theme);
      if (theme !== null) {
        dispatch(setTheme(theme));
      }
    }
    getTheme();
  }, [dispatch]);

  return (
    <NavigationContainer
      theme={
        ThemeRdx.status === 'System default'
          ? scheme === 'light'
            ? LightTheme
            : DarkTheme
          : ThemeRdx.theme
      }>
      <Tab.Navigator initialRouteName="Explore">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: props => TabIcons({...props}, 'home'),
            tabBarActiveTintColor: '#238472',
            headerStyle: {
              elevation: 0,
            },
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
            headerStyle: {
              elevation: 0,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <View style={customStyles.body}>
        <RootContainer />
      </View>
    </Provider>
  );
};

export default App;
