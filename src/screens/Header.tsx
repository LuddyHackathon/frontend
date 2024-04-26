import React from 'react';
import { Linking, View } from 'react-native';
import { Route } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, IconButton, Button } from 'react-native-paper';
import { NativeStackNavigationOptions, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App'
import { PreferencesContext } from '../PreferencesContext';
import { LogoLight, LogoDark } from '../Logo';

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
      <Button icon={back ? 'arrow-left' : ''} onPress={navigation.goBack} textColor={isThemeDark ? 'white' : 'black'} disabled={back ? false : true} style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{height: 24}}>{isThemeDark ? LogoDark : LogoLight}</View>
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
