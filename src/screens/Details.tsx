import React from 'react';
import { Card, Text, Paragraph } from 'react-native-paper';

const DetailsScreen: React.FC = () => {
    return (
        <Card>
            <Card.Content>
                <Text variant='bodyLarge'>Details</Text>
                <Paragraph>Body content in paragraph</Paragraph>
            </Card.Content>
        </Card>
    )
}

export default DetailsScreen;
