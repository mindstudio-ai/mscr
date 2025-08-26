import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import fetch from 'node-fetch';
import { buffer } from 'stream/consumers';

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
  // Extract inputs and validate
  const { audioFileUrl, fileFormat = 'other', outputVariable } = inputs;

  // Validate API key
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your ElevenLabs API key to the connector configuration.',
    );
  }

  // Validate required inputs
  if (!audioFileUrl) {
    throw new Error(
      'Missing Audio File URL. Please provide a URL to an audio file.',
    );
  }

  // Initialize the ElevenLabs client
  const client = new ElevenLabsClient({
    apiKey,
  });

  try {
    // Log the start of the process
    log(`Downloading audio file from ${audioFileUrl}`);

    // Download the audio file
    const audioResponse = await fetch(audioFileUrl);
    if (!audioResponse.ok) {
      throw new Error(
        `Failed to download audio file: ${audioResponse.statusText}`,
      );
    }

    // Convert the response to a buffer
    const audioBuffer = Buffer.from(await audioResponse.arrayBuffer());

    log(
      'Audio file downloaded successfully. Processing audio to remove background noise...',
    );

    // Process the audio using the ElevenLabs API
    const isolatedAudioResponse = await client.audioIsolation.convert({
      audio: audioBuffer,
      fileFormat: fileFormat as 'pcm_s16le_16' | 'other',
    });

    if (!isolatedAudioResponse) {
      throw new Error(
        'Audio isolation failed. No response received from the API.',
      );
    }

    log(
      'Audio processing completed successfully. Uploading processed audio...',
    );

    // Determine the appropriate MIME type based on the response
    // Default to mp3 if we can't determine the type
    const mimeType = 'audio/mp3';

    const buf = await buffer(isolatedAudioResponse);

    // Upload the processed audio file
    const uploadResult = await uploadFile(buf, mimeType);

    log('Processed audio uploaded successfully.');

    // Set the output variable to the URL of the uploaded file
    setOutput(outputVariable, uploadResult);

    log(
      `Audio isolation complete. The processed audio is available at the URL stored in the '${outputVariable}' variable.`,
    );
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
