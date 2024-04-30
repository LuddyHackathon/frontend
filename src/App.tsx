import React from 'react';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './screens/Header';
import HomeScreen from './screens/Home';
import AuthenticationScreen from './screens/Authentication';
import ResumeUploadScreen from './screens/ResumeUpload';
import RecommendationScreen from './screens/Recommendation';
import InterviewerHomeScreen from './screens/InterviewerHome';
import TechnicalInterviewerScreen from './screens/TechnicalInterviewer';

export type RootStackParamList = {
  CareerSpeak: undefined;
  Authentication: undefined;
  Header: undefined;
  ResumeUpload: undefined;
  Recommendation: { text: string };
  InterviewerHome: undefined;
  TechnicalInterviewer: { keywords: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator
      initialRouteName='TechnicalInterviewer'
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
      <Stack.Screen name='Authentication' component={AuthenticationScreen} />
      <Stack.Screen name='ResumeUpload' component={ResumeUploadScreen} />
      <Stack.Screen name='Recommendation' component={RecommendationScreen} initialParams={{ text: '42' }} />
      <Stack.Screen name='InterviewerHome' component={InterviewerHomeScreen} />
      <Stack.Screen name='TechnicalInterviewer' component={TechnicalInterviewerScreen} initialParams={{ keywords: 'python' }} />
    </Stack.Navigator>
  );
}
