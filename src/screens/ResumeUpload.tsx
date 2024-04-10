import React from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-paper';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

const pickFile = async (setMethod: CallableFunction) => {
  const pickerResult = await DocumentPicker.pickSingle({
    type: [DocumentPicker.types.pdf],
    copyTo: 'cachesDirectory'
  });
  setMethod(pickerResult)
}

const ResumeUploadScreen = () => {
  const onUpload = async (res: DocumentPickerResponse | undefined) => {
    try {
      if (!res) { return }
      let formData = new FormData();
      formData.append('resumeFile', {
        uri: res.uri,
        type: res.type,
        name: res.name
      });
      await fetch('http://192.168.1.168/data', {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data'
        },
        body: formData
      });
    } catch (error) {
      console.error(error);
    }
  };
  const [pickedFile, setPickedFile] = React.useState<DocumentPickerResponse>();

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
