import React, { useCallback, useState } from 'react';

import { Platform, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

let Uploady: any = null;
import { useItemErrorListener, useItemFinishListener, useUploady } from '@rpldy/uploady';

if (Platform.OS === 'web') {
  import('@rpldy/uploady')
    .then((module) => {
      Uploady = module.default;
    })
} else {
  import('@rpldy/native-uploady')
    .then((module) => {
      Uploady = module.default;
    })
}
const Upload = () => {
  const [uploadUrl, setUploadUrl] = useState(false);
  const uploadyContext = useUploady();

  useItemFinishListener((item) => {
    const response = JSON.parse(item.uploadResponse.data);
    console.log(`item ${item.id} finished uploading, response was: `, response);
    setUploadUrl(response.url);
    // Once the file is uploaded, you can make a POST request using its URL
    // Example:
    // fetch('your_post_url', {
    //   method: 'POST',
    //   body: JSON.stringify({ fileUrl: response.url }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
  });

  useItemErrorListener((item) => {
    console.log(`item ${item.id} upload error: `, item);
  });

  const pickFile = useCallback(async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });

      const fileUri = res.uri; // Get the URI of the selected file
      uploadyContext.upload({ files: fileUri }); // Upload the file using its URI
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker, exit any dialogs or menus and move on');
      } else {
        throw err;
      }
    }
  }, [uploadyContext]);

  return (
    <View>
      <Button onPress={pickFile}>Upload File </Button>
    </View>
  );
}

const ResumeUploadScreen = () => {
  return (
    <Uploady destination={{ url: 'https://192.168.1.168:65535' }} params={'id=resumeFile'}>
      <View>
        <Upload />
      </View>
    </Uploady>)
};

export default ResumeUploadScreen;
