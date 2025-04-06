import React from 'react';
import { Pressable, View, TextInput as NativeTextInput, useWindowDimensions } from 'react-native';
import { Button, Divider, IconButton, Surface, Text, TextInput } from 'react-native-paper';
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
  const response = React.useState<string>("")

  const sendPrompt = () => {

    return response;
  }

  return (
    <Surface style={{ height: '100%', padding: 25, justifyContent: 'center' }}>
        <Surface elevation={2} style={{ height: '100%', width: '100%', borderRadius: 25, padding: 25 }}>
          <TextInput
            value={response[0]}
            multiline
            scrollEnabled
            disabled
            editable={false}
            style={{ height: 'auto', flexGrow: 100}}
          />
          <View style={{flexDirection: 'row', width: '100%'}}>
            <TextInput
              placeholder='Ask a question'
              multiline={false}
              style={{flexGrow: 100}}
            />
            <IconButton
              icon="send"
              onPress={() => { }}
            />
          </View>
        </Surface>
    </Surface>
  );
};

export default AuthenticationScreen;
