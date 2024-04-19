import React from 'react';

import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Surface, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFilePicker } from 'use-file-picker';

import { fetchLanguageResult } from '../DataFetcher';
import { RootStackParamList } from '../App';
import { API_URL } from '@env';

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
      let formData = new FormData();
      formData.append('resumeFile', res);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_URL}/data`);
      xhr.send(formData);
      setUploadSuccessful(true);
      fetchLanguageResult(res.name, function (err: string, data: Object) {
        if (err) { throw err; }
        // @ts-expect-error
        setTextResult(data.text);
        // @ts-expect-error
        setGrammarResult(data.terminal);
      });
    } catch (error) {
      console.error(error);
    }
  };
  // @ts-expect-error Creating blank file requires valid slice type
  const [pickedFile, setPickedFile] = React.useState<File>({ lastModified: 0, size: 0, type: '', slice: {} });
  const { openFilePicker } = useFilePicker({
    readAs: 'ArrayBuffer',
    accept: '.pdf',
    multiple: false,
    onFilesSelected: (files) => { setPickedFile(files.plainFiles[0]) }
  });
  const [uploadSuccessful, setUploadSuccessful] = React.useState(false);
  const [textResult, setTextResult] = React.useState<string>('');
  const [grammarResult, setGrammarResult] = React.useState<string>('');

  return (
    <Surface style={{ minHeight: '100%' }}>
      {!uploadSuccessful ?
        <View style={{ minHeight: '100%', alignContent: 'center', justifyContent: 'space-evenly' }}>
          {pickedFile.name ?
            <View style={{ alignItems: 'center' }}>
              <Text>Selected: {pickedFile.name}</Text>
              <Text>Size: {pickedFile.size ? pickedFile.size / 1000 : ''}kB</Text>
            </View> : null}
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: '33%' }}>
            <Button mode='outlined' onPress={() => { openFilePicker() }}>Select Resume</Button>
            <Button mode='outlined' onPress={() => { onUpload(pickedFile) }}>Upload</Button>
          </View>
        </View>
        :
        // @ts-expect-error using vh works with webpack
        <View style={{ height: '80vh', justifyContent: 'space-between' }}>
          <View style={{ height: '100%' }}>
            <Surface style={{ height: '85%', padding: '1%', margin: '1%', borderRadius: 25 }}>
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
