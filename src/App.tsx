import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card, Text, Paragraph, useTheme, Button } from 'react-native-paper';

import { PreferencesContext } from './PreferencesContext';

import Header from './screens/Header';
import HomeScreen from './screens/Home';

export type RootStackParamList = {
  Home: undefined,
  Details: undefined,
  Header: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Home = ({ navigation }: Props) => (
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

const DetailsScreen = () => (
  <Card>
    <Card.Content>
      <Text variant='bodyLarge'>Details</Text>
      <Paragraph>Body content in paragraph</Paragraph>
    </Card.Content>
  </Card>
);

export default function App() {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => {
            const { navigation, route, options, back } = props;
            const headerProps = { navigation, route, options, back };
            return <Header {...headerProps} />;
          },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
