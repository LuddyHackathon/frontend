import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { uploadFile } from './DataFetcher';

const audioRecorderPlayer = new AudioRecorderPlayer();

export async function startRecording(filename: string) {
  await audioRecorderPlayer.startRecorder(`${RNFS.CachesDirectoryPath}/${filename}.mp4`);
};

export async function stopRecording(filename: string) {
  const result = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();

  uploadFile(RNFS.readFile(result), 'transcriber', 'voiceFile', '', console.log);
  // RNFS.unlink(result);
};
