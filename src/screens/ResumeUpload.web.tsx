import React from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useFilePicker } from 'use-file-picker';

const ResumeUploadScreen = () => {
  const onUpload = async (res: File) => {
    try {
      let formData = new FormData();
      formData.append('resumeFile', res);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://192.168.1.168/data');
      xhr.send(formData);
    } catch (error) {
      console.error(error);
    }
  };
  const { openFilePicker, plainFiles } = useFilePicker({
    readAs: 'ArrayBuffer',
    accept: '.pdf',
    multiple: false
  });
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button mode='outlined' onPress={openFilePicker}>Select Resume</Button>
        <Button mode='outlined' onPress={() => { onUpload(plainFiles[0]) }}>Upload</Button>
      </View>
    </View >
  )
}

export default ResumeUploadScreen;
