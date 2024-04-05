import React from 'react';

import { getHeaderTitle } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card, Text, Paragraph, useTheme, Appbar, Button, IconButton } from 'react-native-paper';

import { PreferencesContext } from './PreferencesContext';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => (
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

const Header = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}
    >
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      <IconButton
        icon={isThemeDark ? 'brightness-4' : 'brightness-5'}
        onPress={toggleTheme}
      />
    </Appbar.Header>
  );
};

export default function App() {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
