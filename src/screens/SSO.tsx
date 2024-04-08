import React from 'react';
import { View, Button } from 'react-native';

const SSOScreen = () => {
  const handleSignInWithGoogle = () => {
    // implement Google sign-in
  };

  const handleSignInWithGitHub = () => {
    // implement GitHub sign-in
  };
  const handleSignInWithMicrosoft = () => {
    // implement MS sign-in
  };
  const handleSignInWithLinkedin = () => {
    // implement Linkedin sign-in
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign in with Google" onPress={handleSignInWithGoogle} />
      <Button title="Sign in with GitHub" onPress={handleSignInWithGitHub} />
      <Button title="Sign in with GitHub" onPress={handleSignInWithMicrosoft} />
      <Button title="Sign in with GitHub" onPress={handleSignInWithLinkedin} />
    </View>
  );
};

export default SSOScreen;
