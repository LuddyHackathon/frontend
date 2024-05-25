import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { uploadFile, TranscriberResult } from './DataFetcher';

const audioRecorderPlayer = new AudioRecorderPlayer();

export async function startRecording(fileName: string) {
  await audioRecorderPlayer.startRecorder(RNFS.CachesDirectoryPath + '/' + fileName + '.mp4');
};

export async function stopRecording(token: string, done: CallableFunction) {
  const result = (await audioRecorderPlayer.stopRecorder()).replace('//', '/');
  audioRecorderPlayer.removeRecordBackListener();

  let voiceFile = {
    uri: result,
    type: 'audio/mp4',
    name: result,
  };

  let output: TranscriberResult;

  await uploadFile(voiceFile, 'transcriber', 'voiceFile', token, function (err: string, data: TranscriberResult) {
    RNFS.unlink(result);
    if (err) { throw err; }
    output = data;
    done(data);
  });
};
