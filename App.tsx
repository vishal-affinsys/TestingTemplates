import React from 'react';
import ExploreScreen from './src/screens/ExploreScreen';
import {customStyles} from './src/constants/styles';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <View style={customStyles.body}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Explore" component={ExploreScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
