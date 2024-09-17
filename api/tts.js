import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextResponse } from 'next/server';

const client = new TextToSpeechClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const text = req.body.text || 'Hello, welcome to my page!';

    const request = {
      input: { text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    try {
      const [response] = await client.synthesizeSpeech(request);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.send(response.audioContent);
    } catch (error) {
      console.error('Error during TTS request:', error);
      res.status(500).send('Error synthesizing text');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
