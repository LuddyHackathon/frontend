import React from 'react';
import { PaperProvider } from 'react-native-paper';
import MicrophonePage from './screens/HRInterviewer';

const App = () => {
  return (
    <PaperProvider>
      <MicrophonePage />
    </PaperProvider>
  );
};

export default App;