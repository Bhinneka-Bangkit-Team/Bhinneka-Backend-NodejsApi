import { Injectable } from '@nestjs/common';
import * as textToSpeech from '@google-cloud/text-to-speech';
import * as speech from '@google-cloud/speech';
import { HttpStatus } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import * as fs from 'fs';

// Creates a client
const ttsClient = new textToSpeech.TextToSpeechClient();
const speechClient = new speech.SpeechClient();

@Injectable()
export class GoogleapisService {
  async googletts(text: string, lang: string, userId: string) {
    // The text to synthesize
    // const text = 'hello, world!';

    // Construct the request
    const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
      {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: lang, ssmlGender: 'MALE' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
      };

    // Performs the text-to-speech request
    const [response] = await ttsClient.synthesizeSpeech(request);
    if (!fs.existsSync('audio')) {
      fs.mkdirSync('audio');
    }
    await writeFile(`audio/tts${userId}.mp3`, response.audioContent, 'binary');
    return true;
  }

  async googlestt(bufferFile, lang) {
    const audio = {
      content: bufferFile,
    };

    const config: speech.protos.google.cloud.speech.v1.IRecognitionConfig = {
      encoding: 'AMR',
      sampleRateHertz: 8000,
      languageCode: lang,
    };

    const request: speech.protos.google.cloud.speech.v1.IRecognizeRequest = {
      audio: audio,
      config: config,
    };

    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');

    return {
      statusCode: HttpStatus.OK,
      message: 'Transkripsi berhasil !',
      data: transcription,
      error: '',
    };
  }
}
