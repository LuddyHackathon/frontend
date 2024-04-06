import React from 'react';

import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './screens/Header';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/Details';

export type RootStackParamList = {
  CareerSpeak: undefined,
  Details: undefined,
  Header: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator
      initialRouteName='CareerSpeak'
      screenOptions={{
        header: (props) => {
          const options: NativeStackNavigationOptions = {};
          const { navigation, route } = props;
          const back: string = route.name === 'CareerSpeak' ? '' : route.name;
          const headerProps = { navigation, route, options, back };
          // @ts-expect-error: https://github.com/react-navigation/react-navigation/issues/10802
          return <Header {...headerProps} />;
        }
      }}>
      <Stack.Screen name='CareerSpeak' component={HomeScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} />
    </Stack.Navigator>
  );
}
