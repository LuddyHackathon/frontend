import React from 'react';
import { Dimensions, Linking } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { View } from 'react-native';

type RecommenderScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Recommender'
>;

type Props = {
  navigation: RecommenderScreenNavigationProp;
};

const RecommenderScreen: React.FC<Props> = ({ navigation }: Props) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleConnectBackend = () => {
   
    fetch('http://192.168.0.168/recommender', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error connecting to backend:', error);
      });
  };

  let isLandscape = Dimensions.get('window').height < Dimensions.get('window').width;
  
  return (
    <Surface style={{ minHeight: '100%', justifyContent: 'space-evenly', paddingHorizontal: isLandscape?'33%':'auto' }}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text variant='titleLarge'>Welcome to</Text>
        <Text variant='displayLarge'>Recommender</Text>
        <Text variant='titleLarge'>The recommendation page</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button mode="outlined" icon={'arrow-left'} onPress={handleGoBack}>
          Go Back
        </Button>
        <Button mode="contained" icon={'docker'} onPress={handleConnectBackend}>
          Connect to Backend
        </Button>
      </View>
    </Surface>
  );
};

export default RecommenderScreen;
