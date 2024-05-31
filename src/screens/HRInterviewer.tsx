import React from 'react';
import { View } from 'react-native';
import { useTheme, IconButton, Text, Divider, Surface } from 'react-native-paper';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { RootStackParamList } from '../App';
import { fetchQuestions, QuestionsResult, TranscriberResult } from '../DataFetcher';
import { useAccessToken } from '../AccessTokenProvider';
import { startRecording, stopRecording } from '../Microphone';

type HRInterviewerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HRInterviewer'
>;

type Props = {
  navigation: HRInterviewerScreenNavigationProp;
};
type QuestionDetails = {
  question: string,
  transcribed: string,
  paraphrased: string
}
const HRInterviewerScreen: React.FC<Props> = ({ navigation }: Props) => {
  async function toggleRecording() {
    if (!microphoneDisabled) {
      await startRecording(`t${currentQuestion}`);
    } else {

      await stopRecording(accessToken, ((result: string) => {
        let output: TranscriberResult = JSON.parse(result)
        let forQuestion = parseInt(output.file.charAt(1));
        questionDetails.push(
          {
            question: questions[forQuestion],
            transcribed: output.transcribed,
            paraphrased: output.paraphrased
          }
        );
      }));

      if (currentQuestion + 1 != questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigation.navigate('InterviewerResults', { questions: questionDetails, isHR: true });
      };
    };
    setMicrophoneDisabled(!microphoneDisabled);
  };

  const theme = useTheme();
  const [microphoneDisabled, setMicrophoneDisabled] = React.useState<boolean>(false);
  const [questionDetails, setQuestionDetails] = React.useState<Array<QuestionDetails>>([]);
  const [accessToken, setAccessToken] = useAccessToken();

  const [questions, setQuestions] = React.useState<Array<string>>(['']);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);

  useFocusEffect(React.useCallback(() => {
    fetchQuestions('hrinterviewer', '', accessToken, function (err: string, data: QuestionsResult) {
      if (err) { throw err; }
      setQuestions([...data.hr_questions.general, ...data.hr_questions.management, ...data.hr_questions.motivation, ...data.hr_questions.experience]);
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
