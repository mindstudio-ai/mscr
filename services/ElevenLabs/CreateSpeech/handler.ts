import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error('Missing API Key');
  }

  const { voiceId, text, modelId, outputVariable } = inputs;

  const client = new ElevenLabsClient({
    apiKey: process.env.apiKey,
  });

  log(`Generating speech from text: "${text}"`);

  const stream = await client.textToSpeech.convert(voiceId, {
    text,
    modelId,
  });

  log('Received result from model');

  if (!stream) {
    throw new Error('Audio generation failed');
  }

  const chunks: Uint8Array[] = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  const data = Buffer.concat(chunks);

  if (!data) {
    throw new Error('Audio generation failed');
  }

  // Upload data
  const uploadResult = await uploadFile(data, 'audio/mp3');

  log('Uploaded audio to CDN');

  setOutput(outputVariable, uploadResult);
};
