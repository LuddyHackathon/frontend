import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { uploadFile } from './DataFetcher';

const audioRecorderPlayer = new AudioRecorderPlayer();

export async function startRecording() {
  await audioRecorderPlayer.startRecorder();
};

export async function stopRecording(token: string) {
  const result = (await audioRecorderPlayer.stopRecorder()).replace('//', '/');
  audioRecorderPlayer.removeRecordBackListener();
  console.log(result);

  let voiceFile = {
    uri: result,
    type: 'audio/mp4',
    name: result,
  };

  uploadFile(voiceFile, 'transcriber', 'voiceFile', token, console.log);

  RNFS.unlink(result);
};
