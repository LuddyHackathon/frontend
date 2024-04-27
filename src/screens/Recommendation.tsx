import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { fetchRecommenderResult, RecommenderResult } from '../DataFetcher';
import { RootStackParamList } from '../App';
import { useAccessToken } from '../AccessTokenProvider';

type RecommendationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Recommendation'
>;

type RecommendationScreenRouteProp = RouteProp<
  RootStackParamList,
  'Recommendation'
>;

type Props = {
  route: RecommendationScreenRouteProp;
  navigation: RecommendationScreenNavigationProp;
};

const RecommendationScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { text } = route.params;
  const [keywords, setKeywords] = React.useState<string[]>(['']);
  const [recommendation, setRecommendation] = React.useState<string>('');
  const [accessToken, setAccessToken] = useAccessToken();

  useFocusEffect(React.useCallback(() => {
    fetchRecommenderResult(text, accessToken, function (err: string, data: RecommenderResult) {
      if (err) { throw err; }
      setKeywords(data.keywords);
      setRecommendation(data.recommendation);
    });
  }, [text]));
  return (
    <Surface style={{ height: '100%', padding: '5%', justifyContent: 'space-between' }}>
      <View style={{ height: '20%', justifyContent: 'center' }}>
        <Text variant='headlineSmall'>Our Recommendation is:</Text>
        <Text variant='headlineLarge'>{recommendation}</Text>
      </View>
      <View style={{ height: '50%' }}>
        <Text variant='headlineSmall'>Found Keywords:</Text>
        <ScrollView>
          <Text variant='bodyLarge'>{keywords.join(', ')}</Text>
        </ScrollView>
      </View>
      <View style={{ height: '15%', alignItems: 'center' }}>
        <Button mode='contained' style={{ width: 'auto' }} onPress={() => navigation.navigate('InterviewerHome')}>Take Interview</Button>
      </View>
    </Surface>
  );
};

export default RecommendationScreen;
