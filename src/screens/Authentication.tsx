import React from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { Button, Divider, Surface, Text, TextInput } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import { PreferencesContext } from '../PreferencesContext';
import { LogoLight, LogoDark } from '../Logo';
import { fetchAuthenticationResult, AuthenticationResult } from '../DataFetcher';
import { useAccessToken } from '../AccessTokenProvider';

type AuthenticationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Authentication'
>;

type Props = {
  navigation: AuthenticationScreenNavigationProp;
};

const onSubmit = (email: string, password: string, isSignUp: boolean, done: CallableFunction) => {
  let endpoint = isSignUp ? 'signup' : 'login';
  fetchAuthenticationResult(email, password, endpoint, function (err: string, data: AuthenticationResult) {
    if (err) { throw err; }
    const token = data.token;
    done(token);
  });
}

const AuthenticationScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { height, width } = useWindowDimensions();
  const { isThemeDark } = React.useContext(PreferencesContext);

  const [isSignUp, setShowSignUp] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const signAction = ['in', 'up'];
  const changeAction = ['Need an account?', 'Already have an account?'];

  const [hidePass, setHidePass] = React.useState(true);

  const [accessToken, setAccessToken] = useAccessToken();

  return (
    <Surface style={{ height: '100%', paddingVertical: 25, justifyContent: 'center' }}>
      <View style={{ height: 600, justifyContent: 'space-evenly', flexDirection: 'row' }}>
        <Surface elevation={2} style={{ height: '100%', width: width / height > 0.7 ? 350 : '100%', borderRadius: 25, padding: 25 }}>
          <View style={{ alignItems: 'center', height: 50 }}>
            {isThemeDark ? LogoDark : LogoLight}
          </View>
          <Text variant='headlineSmall' style={{ textAlign: 'center', marginVertical: 25 }}>Sign {signAction[+isSignUp]}</Text>
          <Divider />
          <TextInput
            label='Email'
            value={email}
            autoCapitalize='none'
            returnKeyType='next'
            mode='flat'
            blurOnSubmit={false}
            onChangeText={email => setEmail(email)}
            style={{ marginVertical: 25 }} />
          <TextInput
            label='Password'
            value={password}
            autoCapitalize='none'
            returnKeyType='done'
            mode='flat'
            blurOnSubmit={false}
            onChangeText={password => setPassword(password)}
            secureTextEntry={hidePass}
            onSubmitEditing={() => { onSubmit(email, password, isSignUp, (token: string) => { setAccessToken(token); }); navigation.navigate('ResumeUpload'); }}
            right={
              <TextInput.Icon
                icon='eye'
                onPress={() => setHidePass(!hidePass)}
              />
            } />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 50 }}>
            <Button onPress={() => { onSubmit(email, password, isSignUp, (token: string) => { setAccessToken(token); }); navigation.navigate('ResumeUpload'); }} mode='contained'>Submit</Button>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
            <Text>{changeAction[+isSignUp]} </Text>
            <Pressable>
              <Text theme={{ colors: { onSurface: isThemeDark ? '#6CB1FF' : '#1A0DAB' } }} onPress={() => setShowSignUp(!isSignUp)} >
                Sign {signAction[+!isSignUp]}!
              </Text>
            </Pressable>
          </View>
        </Surface>
      </View>
    </Surface>
  );
};

export default AuthenticationScreen;
