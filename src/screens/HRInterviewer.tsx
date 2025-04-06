import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import InterviewerResultsScreen from './InterviewerResults';

const MicrophonePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [showResults, setShowResults] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        audioChunksRef.current = [];
        uploadAndShowSummary(blob);
      };

      setIsRecording(true);
    } catch (err) {
      alert('Microphone access denied.');
      console.error(err);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAndShowSummary(file);
    }
  };

  const uploadAndShowSummary = async (file: Blob) => {
    const formData = new FormData();
    formData.append('voiceFile', file);

    try {
      const response = await fetch('http://127.0.0.1:65535/data', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.summary) {
        setSummary(data.summary);
        setShowResults(true);
      } else {
        alert('No summary received.');
      }
    } catch (err) {
      alert('Upload failed.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      {showResults ? (
        <InterviewerResultsScreen summary={summary} />
      ) : (
        <View style={styles.audioContainer}>
          <Button icon="upload" mode="contained" onPress={handleUploadButtonClick}>
            Upload Audio File
          </Button>
          <Button
            icon="microphone"
            mode="contained"
            onPress={isRecording ? handleStopRecording : handleStartRecording}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelected}
            style={{ display: 'none' }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  audioContainer: {
    gap: 20,
    alignItems: 'center',
  },
});

export default MicrophonePage;