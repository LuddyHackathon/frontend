import os
import requests

from transcriber.app import transcribe

session = requests.Session()

voice_name = input('Enter location of uploaded audio:')

print(f'Sending {voice_name} to server...')

files =  {'voiceFile': open(voice_name, 'rb')}
params =  {'voice_file', voice_name}

transcription = requests.post('http://127.0.0.1:65535/transcriber', files=files)

while True:
    os.system('cls' if os.name == 'nt' else 'clear')

    print('Transcribed Text:', transcription.json()['transcribed'],  sep='\n')

    print('1: summarize','2: action points', '3: sentiment analysis', sep='\t')

    next = int(input())

    if next == 1  or next == 2:
        os.system('cls' if os.name == 'nt' else 'clear')

        response = requests.post('http://127.0.0.1:65535/summary', params={'text': transcription})

        print('Summary:', response.json())

        print('2: action points', '3: sentiment analysis', sep='\t')

        next  = input()
