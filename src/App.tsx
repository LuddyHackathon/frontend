import React from 'react';

import { NavigationContainer, Theme } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './screens/Header';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/Details';

export type RootStackParamList = {
  Home: undefined,
  Details: undefined,
  Header: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          header: (props) => {
            const options: NativeStackNavigationOptions = {};
            const { navigation, route } = props;
            const back: string = route.name == 'Home' ? '': route.name;
            const headerProps = { navigation, route, options, back };
            return <Header {...headerProps} />;
          }
        }}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Details' component={DetailsScreen} />
      </Stack.Navigator>
  );
}
