import React from 'react';

import { Card, Text, Paragraph, Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
    return (
        <Card>
            <Card.Content>
                <Text variant='bodyLarge'>Home</Text>
                <Button mode="contained" onPress={() => navigation.navigate('Details')}>
                    Go to details
                </Button>
                <Paragraph>Body content in paragraph</Paragraph>
            </Card.Content>
        </Card>
    );
}

export default HomeScreen;
