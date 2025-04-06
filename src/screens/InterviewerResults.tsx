import React from 'react';
import { View, useWindowDimensions, ScrollView } from 'react-native';
import { Surface, Text } from 'react-native-paper';

type Props = {
  summary: string;
};

const InterviewerResultsScreen: React.FC<Props> = ({ summary }: Props) => {
  const { width, height } = useWindowDimensions();

  return (
    <Surface style={{ height: '100%', width: '100%', alignItems: 'center' }}>
      <View
        style={{
          height: '85%',
          width: width / height > 0.7 ? '66%' : '100%',
          justifyContent: 'center',
        }}
      >
        <Surface
          elevation={2}
          style={{
            padding: 25,
            margin: 25,
            borderRadius: 25,
            maxHeight: '90%',
          }}
        >
          <ScrollView>
            <Text variant="titleLarge" style={{ marginBottom: 15 }}>
              Summarized Text
            </Text>
            <Text>{summary || 'No summary received.'}</Text>
          </ScrollView>
        </Surface>
      </View>
    </Surface>
  );
};

export default InterviewerResultsScreen;