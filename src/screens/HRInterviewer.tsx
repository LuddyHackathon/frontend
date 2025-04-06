// import React from 'react';
// import { View } from 'react-native';
// import { useTheme, IconButton, Text, Divider, Surface } from 'react-native-paper';
// import { RouteProp, useFocusEffect } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

// import { RootStackParamList } from '../App';
// import { fetchQuestions, QuestionsResult, TranscriberResult } from '../DataFetcher';
// import { useAccessToken } from '../AccessTokenProvider';
// import { startRecording, stopRecording } from '../Microphone';

// type HRInterviewerScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'HRInterviewer'
// >;

// type Props = {
//   navigation: HRInterviewerScreenNavigationProp;
// };
// type QuestionDetails = {
//   question: string,
//   transcribed: string,
//   paraphrased: string
// }
// const HRInterviewerScreen: React.FC<Props> = ({ navigation }: Props) => {
//   async function toggleRecording() {
//     if (!microphoneDisabled) {
//       await startRecording(`t${currentQuestion}`);
//     } else {

//       await stopRecording(accessToken, ((result: string) => {
//         let output: TranscriberResult = JSON.parse(result)
//         let forQuestion = parseInt(output.file.charAt(1));
//         questionDetails.push(
//           {
//             question: questions[forQuestion],
//             transcribed: output.transcribed,
//             paraphrased: output.paraphrased
//           }
//         );
//       }));

//       if (currentQuestion + 1 != questions.length) {
//         setCurrentQuestion(currentQuestion + 1);
//       } else {
//         navigation.navigate('InterviewerResults', { questions: questionDetails, isHR: true });
//       };
//     };
//     setMicrophoneDisabled(!microphoneDisabled);
//   };

//   const theme = useTheme();
//   const [microphoneDisabled, setMicrophoneDisabled] = React.useState<boolean>(false);
//   const [questionDetails, setQuestionDetails] = React.useState<Array<QuestionDetails>>([]);
//   const [accessToken, setAccessToken] = useAccessToken();

//   const [questions, setQuestions] = React.useState<Array<string>>(['']);
//   const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);

//   useFocusEffect(React.useCallback(() => {
//     fetchQuestions('hrinterviewer', '', accessToken, function (err: string, data: QuestionsResult) {
//       if (err) { throw err; }
//       setQuestions([...data.hr_questions.general, ...data.hr_questions.management, ...data.hr_questions.motivation, ...data.hr_questions.experience]);
//     });
//   }, [navigation]));

//   return (
//     <Surface style={{ height: '100%', paddingHorizontal: 25, paddingVertical: 50, justifyContent: 'space-between' }}>
//       <View>
//         <Text variant='titleLarge'>Question {currentQuestion + 1} of {questions.length}</Text>
//         <Divider style={{ marginTop: 25, marginBottom: 50 }} />
//         <Text variant='titleLarge'>{questions[currentQuestion]}</Text>
//       </View>
//       <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//         <IconButton size={40} iconColor={theme.colors.onPrimaryContainer} containerColor={microphoneDisabled ? theme.colors.primaryContainer : theme.dark ? theme.colors.onError : theme.colors.error} icon={'microphone' + (microphoneDisabled ? '' : '-off')} onPress={toggleRecording} />
//       </View>
//     </Surface>
//   );
// };

// export default HRInterviewerScreen;
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const MicrophonePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        audioChunksRef.current = [];
      };

      setIsRecording(true);
    } catch (err) {
      alert('Microphone permission denied or not supported.');
      console.error(err);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('voiceFile', file);
      uploadFile(formData);
    }
  };

  const uploadFile = async (formData: FormData) => {
    try {
      const res = await fetch('http://127.0.0.1:65535/data', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert('Upload successful');
      console.log(data);
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      {audioUrl && (
        <View style={styles.audioContainer}>
          <audio controls src={audioUrl} />
          <a href={audioUrl} download="recorded_audio.wav" style={{ marginTop: 10 }}>
            Download Recording
          </a>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="contained" icon="upload" onPress={handleUploadButtonClick}>
          Upload File
        </Button>
        <Button
          mode="contained"
          icon="microphone"
          onPress={isRecording ? handleStopRecording : handleStartRecording}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </View>

      {/* Actual hidden input element */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileSelected}
        style={{ display: 'none' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  audioContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default MicrophonePage;

