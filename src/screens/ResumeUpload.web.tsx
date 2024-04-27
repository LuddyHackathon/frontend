import React from 'react';

import { ScrollView, View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Button, Surface, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFilePicker } from 'use-file-picker';

import { uploadFile, fetchLanguageResult, LanguageResult } from '../DataFetcher';
import { RootStackParamList } from '../App';
import { useAccessToken } from '../AccessTokenProvider';

type ResumeUploadScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ResumeUpload'
>;

type Props = {
  navigation: ResumeUploadScreenNavigationProp;
};

const ResumeUploadScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onUpload = async (res: File) => {
    try {
      uploadFile(res, accessToken, function () {
        setUploadSuccessful(true);
        fetchLanguageResult(res.name, accessToken, function (err: string, data: LanguageResult) {
          if (err) { throw err; }
          setTextResult(data.text);
          setGrammarResult(data.terminal);
        });
      });
    } catch (error) {
      console.error(error);
    };
  };
  const [pickedFile, setPickedFile] = React.useState<File>();
  const { openFilePicker } = useFilePicker({
    readAs: 'ArrayBuffer',
    accept: '.pdf',
    multiple: false,
    onFilesSelected: (files) => { setPickedFile(files.plainFiles[0]) }
  });
  const [uploadSuccessful, setUploadSuccessful] = React.useState(false);
  const [textResult, setTextResult] = React.useState<string>('');
  const [grammarResult, setGrammarResult] = React.useState<string>('');

  let { width, height } = useWindowDimensions();

  const [accessToken, setAccessToken] = useAccessToken();

  return (
    <Surface style={{ height: '100%', width: '100%', alignItems: 'center' }}>
      {!uploadSuccessful
        ? <View style={{ borderWidth: 5, height: '100%', width: width / height > 0.7 ? 360 : '100%', justifyContent: 'space-evenly' }}>
          {pickedFile ?
            <View style={{ alignItems: 'center' }}>
              <Text>Selected: {pickedFile.name}</Text>
              <Text>Size: {pickedFile.size ? pickedFile.size / 1000 : ''}kB</Text>
            </View> : null}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button mode='outlined' onPress={() => { openFilePicker() }}>Select Resume</Button>
            <Button mode='outlined' onPress={() => { pickedFile ? onUpload(pickedFile) : null }}>Upload</Button>
          </View>
        </View>
        : <View style={{ height: '85%', width: width / height > 0.7 ? '66%' : '100%', justifyContent: 'space-between' }}>
          <View style={{ height: '100%' }}>
            <Surface elevation={2} style={{ minHeight: '50%', maxHeight: '85%', padding: 25, margin: 25, borderRadius: 25 }}>
              <ScrollView>
                {grammarResult ? <Text>{grammarResult}</Text> : <ActivityIndicator animating={true} />}
              </ScrollView>
            </Surface>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button mode='contained' onPress={() => navigation.navigate('Recommendation', { text: textResult })}>See Recommendation</Button>
            <Button mode='contained' onPress={() => navigation.navigate('InterviewerHome')}>Take Interview</Button>
          </View>
        </View>}
    </Surface>
  );
}

export default ResumeUploadScreen;
