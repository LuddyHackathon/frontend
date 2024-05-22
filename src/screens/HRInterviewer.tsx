import React from 'react';
import { View } from 'react-native';
import { useTheme, IconButton, Text, Divider, Surface } from 'react-native-paper';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { RootStackParamList } from '../App';
import { fetchQuestions, QuestionsResult } from '../DataFetcher';
import { useAccessToken } from '../AccessTokenProvider';

type HRInterviewerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HRInterviewer'
>;

type HRInterviewerScreenRouteProp = RouteProp<
  RootStackParamList,
  'HRInterviewer'
>;

type Props = {
  route: HRInterviewerScreenRouteProp;
  navigation: HRInterviewerScreenNavigationProp;
};

const HRInterviewerScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  async function toggleRecording() {
    setMicrophoneDisabled(!microphoneDisabled);
    if (!microphoneDisabled) {
      const permissionResult = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
      if (permissionResult === RESULTS.GRANTED) {
        console.log('mic on');
      } else {
        requestMicrophonePermission();
      };
    } else {
      if (currentQuestion + 1 != questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigation.navigate('CareerSpeak');
      };
    };
  };
  const requestMicrophonePermission = async () => {
    const permissionResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (permissionResult === RESULTS.GRANTED) {
      // startRecording();
      console.log('recording started.');
    } else {
      console.warn('Microphone permission not granted');
    }
  };
  const theme = useTheme();
  const [microphoneDisabled, setMicrophoneDisabled] = React.useState<boolean>(false);
  const [accessToken, setAccessToken] = useAccessToken();

  const [questions, setQuestions] = React.useState<Array<string>>(['']);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);

  useFocusEffect(React.useCallback(() => {
    fetchQuestions('hrinterviewer', '', accessToken, function (err: string, data: QuestionsResult) {
      if (err) { throw err; }
      setQuestions(Array.prototype.concat(data.hr_questions.general, data.hr_questions.experience, data.hr_questions.management, data.hr_questions.motivation));
    });
  }, [navigation]));

  return (
    <Surface style={{ height: '100%', paddingHorizontal: 25, paddingVertical: 50, justifyContent: 'space-between' }}>
      <View>
        <Text variant='titleLarge'>Question {currentQuestion + 1} of {questions.length}</Text>
        <Divider style={{ marginTop: 25, marginBottom: 50 }} />
        <Text variant='titleLarge'>{questions[currentQuestion]}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <IconButton size={40} iconColor={theme.colors.onPrimaryContainer} containerColor={microphoneDisabled ? theme.colors.primaryContainer : theme.dark ? theme.colors.onError : theme.colors.error} icon={'microphone' + (microphoneDisabled ? '' : '-off')} onPress={toggleRecording} />
      </View>
    </Surface>
  );
};

export default HRInterviewerScreen;
