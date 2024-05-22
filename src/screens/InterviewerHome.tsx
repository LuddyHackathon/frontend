import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';

type InterviewerHomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InterviewerHome'
>;

type Props = {
  navigation: InterviewerHomeScreenNavigationProp;
};

const InterviewerHomeScreen: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <View style={{ height: '100%', padding: '5%' }}>
      <View style={{ height: '60%', justifyContent: 'space-around' }}>
        <Text variant='headlineMedium'>Welcome to Careerspeak's Interview Portal</Text>
        <Text variant='bodyLarge'>Are you ready to take the next step in your career journey? At Careerspeak, we understand that every individual's path is unique, which is why we offer tailored interview experiences to help you shine. Whether you're a tech wizard or a people person, we've got you covered.</Text>
        <Text variant='bodyLarge'>We're excited to have you interview with us today! Please select the type of interview you're preparing for.</Text>
      </View>
      <View style={{ height: '40%', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button mode='contained' onPress={() => navigation.navigate('TechnicalInterviewer', { keywords: 'python' })}>Technical Interview</Button>
          <Button mode='contained' onPress={() => navigation.navigate('HRInterviewer')}>HR Interview</Button>
        </View>
      </View>
    </View>
  );
};

export default InterviewerHomeScreen;
