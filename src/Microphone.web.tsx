// import { uploadFile } from './DataFetcher';

// export async function startRecording(filename: string) {
// };

// export async function stopRecording(filename: string) {
// };

// import React, { useState, useRef } from 'react';

// const MicrophonePage = () => {
//     const [isRecording, setIsRecording] = useState(false);
//     const [audioUrl, setAudioUrl] = useState('');
//     // Explicitly typing the ref to hold either a MediaRecorder instance or null
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const audioChunksRef = useRef<Blob[]>([]);

//     const handleStartRecording = async () => {
//         if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//                 // Now TypeScript knows mediaRecorderRef can hold a MediaRecorder instance
//                 mediaRecorderRef.current = new MediaRecorder(stream);
//                 mediaRecorderRef.current.start();

//                 mediaRecorderRef.current.ondataavailable = (event) => {
//                     audioChunksRef.current.push(event.data);
//                 };

//                 mediaRecorderRef.current.onstop = () => {
//                     const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//                     const audioUrl = URL.createObjectURL(audioBlob);
//                     setAudioUrl(audioUrl);
//                     audioChunksRef.current = [];
//                 };

//                 setIsRecording(true);
//             } catch (error) {
//                 console.error('Failed to start recording:', error);
//             }
//         } else {
//             console.error('getUserMedia not supported on this browser!');
//         }
//     };

//     const handleStopRecording = () => {
//         if (mediaRecorderRef.current) {
//             mediaRecorderRef.current.stop();
//             setIsRecording(false);
//         }
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: 50 }}>
//             <button onClick={handleStartRecording} disabled={isRecording}>
//                 Start Recording
//             </button>
//             <button onClick={handleStopRecording} disabled={!isRecording}>
//                 Stop Recording
//             </button>
//             {audioUrl && <audio controls src={audioUrl} style={{ display: 'block', marginTop: 20 }} />}
//         </div>
//     );
// };

// export default MicrophonePage;
