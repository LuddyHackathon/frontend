import React from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

export const pickFile = async (setMethod: CallableFunction) => {
  const pickerResult = await DocumentPicker.pickSingle({
    type: [DocumentPicker.types.pdf],
    copyTo: 'cachesDirectory'
  });
  setMethod(pickerResult)
}

const ResumeUploadScreen = () => {
  const onUpload = async (res: any) => {
    try {
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
      }).then(() => { console.log('got response') })
      console.log('RESPONSE', result)
    } catch (error) {
      console.error(error);
    }
  };
  const [pickedFile, setPickedFile] = React.useState();

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button mode='outlined' onPress={() => { pickFile(setPickedFile) }}>Select Resume</Button>
        <Button mode='outlined' onPress={() => { onUpload(pickedFile) }}>Upload</Button>
      </View>
    </View >
  )
}

export default ResumeUploadScreen;
