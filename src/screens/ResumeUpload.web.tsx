import React from 'react';

import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Surface, Text } from 'react-native-paper';
import { useFilePicker } from 'use-file-picker';
import { fetchLanguageResult } from '../DataFetcher';

const ResumeUploadScreen = () => {
  const onUpload = async (res: File) => {
    try {
      let formData = new FormData();
      formData.append('resumeFile', res);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://192.168.1.168/data');
      xhr.send(formData);
      setUploadSuccessful(true);
      fetchLanguageResult(res.name, function (err: string, data: Object) {
        if (err) { throw err; }
        // @ts-expect-error
        setLanguageResult(data.text);
        // @ts-expect-error
        setGrammarResult(data.grammar);
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
  const [languageResult, setLanguageResult] = React.useState<string>('')
  const [grammarResult, setGrammarResult] = React.useState<Object[]>()

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
            <Button mode='outlined' onPress={() => { openFilePicker() }}>Select Resume</Button>
            <Button mode='outlined' onPress={() => { onUpload(pickedFile) }}>Upload</Button>
          </View>
        </View>
        :
        <Surface style={{ minHeight: '50%', maxHeight: '75%', padding: '5%', margin: '5%', borderRadius: 25 }}>
          <ScrollView>
            {languageResult ? <Text>{languageResult}</Text> : <ActivityIndicator animating={true} />}
          </ScrollView>
        </Surface>}
    </Surface>
  )
}

export default ResumeUploadScreen;
