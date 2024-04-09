import React from 'react';

import { Platform, View } from 'react-native';
import { Button } from 'react-native-paper';

let DocumentPicker: any = null;

if (Platform.OS !== 'web') {
  import('react-native-document-picker')
    .then((module) => {
      DocumentPicker = module.default
    })
}

const ResumeUploadScreen = () => {
  const onSelectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      let formData = new FormData();
      formData.append('resumeFile', {
        uri: res.uri,
        type: res.type,
        name: res.name
      });
      console.log('FORMDATA', {
        uri: res.uri,
        type: res.type,
        name: res.name
      });
      let result = await fetch('http://192.168.1.168/data', {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data'
        },
        body: formData
      });
      console.log('RESPONSE', result)
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Canceled');
      } else {
        console.error('Unknown Error: ' + error);
      }
    }
  };

  return (
    <View>
      <Button onPress={onSelectFile}>Upload Resume</Button>
    </View >
  )
}

export default ResumeUploadScreen;
