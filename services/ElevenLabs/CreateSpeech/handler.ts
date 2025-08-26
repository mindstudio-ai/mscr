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
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing ElevenLabs API Key. Please configure your API key in the connector settings.',
    );
  }

  // Extract inputs
  const { voiceId, text, modelId, outputVariable } = inputs;

  // Validate required inputs
  if (!voiceId) {
    throw new Error('Missing Voice ID. Please provide a valid voice ID.');
  }

  if (!text || text.trim() === '') {
    throw new Error('Missing text. Please provide text to convert to speech.');
  }

  // Initialize the ElevenLabs client
  const client = new ElevenLabsClient({
    apiKey,
  });

  log(
    `Generating speech from text (${text.length} characters) using voice ID: ${voiceId}`,
  );

  try {
    // Convert text to speech using the ElevenLabs API
    const stream = await client.textToSpeech.convert(voiceId, {
      text,
      modelId,
    });

    log('Received audio stream from ElevenLabs');

    if (!stream) {
      throw new Error(
        'Audio generation failed. No data received from ElevenLabs.',
      );
    }

    // Collect chunks from the stream
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    // Combine chunks into a single buffer
    const audioData = Buffer.concat(chunks);

    if (!audioData || audioData.length === 0) {
      throw new Error('Audio generation failed. Received empty audio data.');
    }

    log(`Successfully generated ${audioData.length} bytes of audio data`);

    // Upload the audio file
    const audioUrl = await uploadFile(audioData, 'audio/mp3');
    log('Successfully uploaded audio file');

    // Set the output variable with the URL of the uploaded audio file
    setOutput(outputVariable, audioUrl);
    log('Audio is ready for playback');
  } catch (error) {
    // Handle errors from the API call
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error generating speech: ${errorMessage}`);
    throw error;
  }
};
