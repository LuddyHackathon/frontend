import React from 'react';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './screens/Header';
import HomeScreen from './screens/Home';
import ResumeUploadScreen from './screens/ResumeUpload';
import RecommenderScreen from './screens/Recommender';

export type RootStackParamList = {
  CareerSpeak: undefined;
  SSO: undefined;
  Header: undefined;
  ResumeUpload: undefined;
  Recommender: undefined;
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
      <Stack.Screen name='ResumeUpload' component={ResumeUploadScreen} />
      <Stack.Screen name='Recommender' component={RecommenderScreen} />
    </Stack.Navigator>
  );
}
