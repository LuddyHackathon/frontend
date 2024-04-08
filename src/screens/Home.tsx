import React from 'react';
import { Dimensions, Linking } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { View } from 'react-native';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CareerSpeak'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
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
        <Button mode="contained" icon={'rocket-launch'} onPress={handleGetStarted}>
          Get Started
        </Button>
      </View>
    </Surface>
  );
};

export default HomeScreen;
