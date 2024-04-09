import React from 'react';

import { Button } from 'react-native-paper';
import { View } from 'react-native';

import pickFile from '../FilePicker';

const ResumeUploadScreen = () => {
  const onSelectFile = async () => {
    try {
      const res = await pickFile();
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
      console.error(error);
    }
  };

  return (
    <View>
      <Button onPress={onSelectFile}>Uploa d Resume</Button>
    </View >
  )
}

export default ResumeUploadScreen;
