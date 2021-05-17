import { Injectable } from '@nestjs/common';
import * as textToSpeech from '@google-cloud/text-to-speech';
import * as speech from '@google-cloud/speech';
import * as fs from 'fs';
import * as util from 'fs';
const Translate = require('@google-cloud/translate').v2;

// Creates a client
const ttsClient = new textToSpeech.TextToSpeechClient();
const speechClient = new speech.SpeechClient();

const translate = new Translate('folkloric-ocean-308008');

@Injectable()
export class GoogleapisService {
  constructor() {}

  async speechFromText(text) {
    // The text to synthesize
    // const text = 'hello, world!';

    // Construct the request
    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      // select the type of audio encoding
      audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    const [response] = await ttsClient.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
  }

  async textFromSpeech(speechUri) {
    // The path to the remote LINEAR16 file
    const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      uri: gcsUri,
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };
    const request = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  }

  async translate(text, target) {
    // Translates some text into Russian
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
  }
}
