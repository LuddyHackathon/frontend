import React from 'react';

import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

const SSOScreen = () => {
  const { authorize, clearSession, user, error, isLoading } = useAuth0();
  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  if (isLoading) {
    return <View ><Text>isLoading</Text></View>;
  }

  const loggedIn = user !== undefined && user !== null;

  return (
    <Auth0Provider domain={"dev-rl5hkn5dh1vq3jl3.eu.auth0.com"} clientId={"OhJMAoDmC7TeLKe2Y9WMmWJFCkWAeT5C"}>
      {loggedIn && <Text>You are logged in as {user.name}</Text>}
      {!loggedIn && <Text>You are not logged in</Text>}
      {error && <Text>{error.message}</Text>}

      <Button onPress={loggedIn ? onLogout : onLogin}>
        {loggedIn ? 'Log Out' : 'Log In'}
      </Button>
    </Auth0Provider>
  );
};

export default SSOScreen;
