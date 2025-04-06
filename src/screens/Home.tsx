import React from 'react';
import { Linking, View, useWindowDimensions } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CareerSpeak'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
  const handleGetStarted = () => {
    navigation.navigate('HRInterviewer');
  };

  let { width, height } = useWindowDimensions();

  return (
    <Surface style={{ height: '100%', flexDirection: 'row',justifyContent: 'center'}}>
      <View style={{ height: '100%', width: width / height > 0.7 ? 360 : '100%', justifyContent:'space-evenly'}}>
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
      </View>
    </Surface>
  );
};

export default HomeScreen;
