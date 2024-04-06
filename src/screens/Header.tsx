import React from 'react';
import { Linking } from 'react-native';
import { Route } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, IconButton, Button, Icon } from 'react-native-paper';
import { NativeStackNavigationOptions, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App'
import { PreferencesContext } from '../PreferencesContext';

type HeaderScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Header'
>;

type Props = {
  navigation: HeaderScreenNavigationProp,
  route: Route<string>,
  options: NativeStackNavigationOptions,
  back: string | undefined;
};

const Header = ({ navigation, route, options, back }: Props) => {
  const title = getHeaderTitle(options, route.name);
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return (
    <Appbar.Header>
      <Button icon={back ? 'arrow-left' : ''} onPress={navigation.goBack} textColor={isThemeDark ? 'white' : 'black'} disabled={back ? false : true}>
        <Icon size={25} source='package-variant' /> {/** Change to actual logo */}
      </Button>
      <Appbar.Content title={title} />
      <IconButton
        icon='github'
        onPress={() => Linking.openURL('https://github.com/CareerSpeak')}
      />
      <IconButton
        icon={isThemeDark ? 'brightness-4' : 'brightness-5'}
        onPress={toggleTheme}
      />
    </Appbar.Header >
  );
};

export default Header;
