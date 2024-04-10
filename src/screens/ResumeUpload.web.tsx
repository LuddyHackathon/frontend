import React from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useFilePicker } from 'use-file-picker';

const ResumeUploadScreen = () => {
    const onUpload = async (res: any) => {
        console.log(res)
        try {
            let formData = new FormData();
            formData.append('resumeFile', res);
            console.log('FORMDATA', {
                uri: res.content,
                type: res.type,
                name: res.name
            });
            let result = await fetch('http://192.168.1.168/data', {
                mode: 'no-cors',
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
    const { openFilePicker, plainFiles } = useFilePicker({
        accept: '.pdf',
        readAs: 'BinaryString'
    });
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button mode='outlined' onPress={openFilePicker}>Select Resume</Button>
                <Button mode='outlined' onPress={() => { onUpload(plainFiles[0]) }}>Upload</Button>
            </View>
        </View >
    )
}

export default ResumeUploadScreen;
