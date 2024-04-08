import React from 'react';
import { Dimensions, Linking } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { View } from 'react-native';

import DocumentPicker from "react-native-document-picker";
import { useState, useCallback, useContext } from "react";
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, ImageBackground, Image } from "react-native";


import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener,
} from "@rpldy/native-uploady";

const ResumeUploadScreen = () => {
  return (
    <>
      <NativeUploady        
        destination={{ url: "http://localhost:65535/data" }}>
       
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">

              <View >
              <View >
                <Text >Upload File</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        <Upload/>
      </NativeUploady>
    </>
  );
};


const Upload = () => {
    const [uploadUrl, setUploadUrl] = useState(false);
    const uploadyContext = useContext(UploadyContext);
  
    useItemFinishListener((item) => {
      const response = JSON.parse(item.uploadResponse.data);
      console.log(`item ${item.id} finished uploading, response was: `, response);
      setUploadUrl(response.url);
    });
  
    useItemErrorListener((item) => {
      console.log(`item ${item.id} upload error !!!! `, item);
    });
  
    useItemStartListener((item) => {
      console.log(`item ${item.id} starting to upload,name = ${item.file.name}`);
    });
  
    const pickFile = useCallback(async () => {
      try {
        const res:any = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
  
        uploadyContext.upload(res);
        
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log("User cancelled the picker, exit any dialogs or menus and move on");
        } else {
          throw err;
        }
      }
    }, [uploadyContext]);
  
    return (
      <View>
        <Button  onPress={pickFile} >chosefile </Button>
        
      </View>
    );
  };


type ResumeUploadScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CareerSpeak'
>;

type Props = {
  navigation: ResumeUploadScreenNavigationProp;
};

const App: React.FC<Props> = ({ navigation }: Props) => {
  const handleGetStarted = () => {
    navigation.navigate('ResumeUpload');
  };

  let isLandscape = Dimensions.get('window').height < Dimensions.get('window').width;
  
  return (
    <Surface style={{ minHeight: '100%', justifyContent: 'space-evenly', paddingHorizontal: isLandscape?'33%':'auto' }}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text variant='titleLarge'>Welcome to</Text>
        <Text variant='displayLarge'>CareerSpeak</Text>
        <Text variant='titleLarge'>The placement preparation app</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button mode="outlined" icon={'github'} onPress={() => Linking.openURL('https://github.com/CareerSpeak')}>
          GitHub
        </Button>
        <Button mode="contained" icon={'emoticon-neutral-outline'} onPress={handleGetStarted}>
          Get Started
        </Button>
      </View>
    </Surface>
  );
};

export default ResumeUploadScreen;

