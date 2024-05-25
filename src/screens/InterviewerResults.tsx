import React from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Button, Divider, Surface, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import { RouteProp } from '@react-navigation/native';

type InterviewerResultsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InterviewerResults'
>;

type InterviewerResultsScreenRouteProp = RouteProp<
  RootStackParamList,
  'InterviewerResults'
>;

type Props = {
  route: InterviewerResultsScreenRouteProp;
  navigation: InterviewerResultsScreenNavigationProp;
};

const InterviewerResultsScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { questions } = route.params;
  const { width, height } = useWindowDimensions();
  return (
    <Surface style={{ height: '100%', width: '100%', alignItems: 'center' }} >
      <View style={{ height: '85%', width: width / height > 0.7 ? '66%' : '100%', justifyContent: 'space-between' }}>
        <View style={{ height: '100%' }}>
          <Surface elevation={2} style={{ minHeight: '50%', maxHeight: '85%', padding: 25, margin: 25, borderRadius: 25 }}>
            <ScrollView>
              {questions.map(function (question, i) {
                return (
                  <View>
                    <Text key={i}>Q. {i + 1}: {question.question}{'\n'}</Text>
                    <Text key={i}>Original Answer: {question.transcribed}{'\n'}</Text>
                    <Text key={i}>Paraphrased: {question.paraphrased}{'\n'}</Text>
                    <Divider />
                  </View>
                )
              })}
            </ScrollView>
          </Surface>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button mode='outlined' onPress={() => navigation.navigate('CareerSpeak')}>Back to Home</Button>
            <Button mode='contained' onPress={() => navigation.navigate('HRInterviewer')}>HR Interview</Button>
          </View>
        </View>
      </View>
    </Surface>
  );
};

export default InterviewerResultsScreen;
