import React from 'react';

import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Surface, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DocumentPicker, { DocumentPickerResponse, isCancel } from 'react-native-document-picker';

import { fetchLanguageResult } from '../DataFetcher';
import { RootStackParamList } from '../App';
import { API_URL } from '@env';

const pickFile = async (setMethod: CallableFunction) => {
  const pickerResult = await DocumentPicker.pickSingle({
    type: [DocumentPicker.types.pdf],
    copyTo: 'cachesDirectory'
  }).catch((error) => {
    if (isCancel(error)) {
      console.log('Cancelled')
    } else {
      console.error(error)
    }
  })
  setMethod(pickerResult)
}

type ResumeUploadScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ResumeUpload'
>;

type Props = {
  navigation: ResumeUploadScreenNavigationProp;
};

const ResumeUploadScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onUpload = async (res: DocumentPickerResponse) => {
    try {
      let formData = new FormData();
      formData.append('resumeFile', {
        uri: res.uri,
        type: res.type,
        name: res.name
      });
      await fetch(`${API_URL}/data`, {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data'
        },
        body: formData
      });
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

  const [pickedFile, setPickedFile] = React.useState<DocumentPickerResponse>({ name: null, uri: '', fileCopyUri: null, type: null, size: null });
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
            <Button mode='outlined' onPress={() => { pickFile(setPickedFile) }}>Select Resume</Button>
            <Button mode='outlined' onPress={() => { onUpload(pickedFile) }}>Upload</Button>
          </View>
        </View>
        :
        <View style={{ justifyContent: 'space-between' }}>
          <Surface style={{ minHeight: '50%', maxHeight: '75%', padding: '5%', margin: '5%', borderRadius: 25 }}>
            <ScrollView>
              {grammarResult ? <Text>{grammarResult}</Text> : <ActivityIndicator animating={true} />}
            </ScrollView>
          </Surface>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button mode='contained' onPress={() => navigation.navigate('Recommendation', { text: textResult })}>See Recommendation</Button>
            <Button mode='contained' onPress={() => navigation.navigate('Recommendation', { text: textResult })}>Take Interview</Button>
          </View>
        </View>}
    </Surface>
  );
}

export default ResumeUploadScreen;
