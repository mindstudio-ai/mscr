import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { CreateSoundEffectRequest } from '@elevenlabs/elevenlabs-js/api';

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
  // Validate API key
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your ElevenLabs API key in the service settings.',
    );
  }

  // Extract inputs
  const {
    text,
    durationSeconds,
    promptInfluence,
    outputFormat,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!text) {
    throw new Error('Text description is required.');
  }

  // Validate duration if provided
  if (
    durationSeconds &&
    (Number(durationSeconds) < 0.5 || Number(durationSeconds) > 30)
  ) {
    throw new Error('Duration must be between 0.5 and 30 seconds.');
  }

  // Initialize ElevenLabs client
  const client = new ElevenLabsClient({
    apiKey,
  });

  // Prepare parameters for sound effect generation
  const params: CreateSoundEffectRequest = {
    text,
  };

  // Add optional parameters if provided
  if (durationSeconds) {
    params.durationSeconds = Number(durationSeconds);
  }

  if (promptInfluence) {
    params.promptInfluence = Number(promptInfluence);
  }

  // Add output format as a query parameter if provided
  if (outputFormat) {
    params.outputFormat = outputFormat;
  }

  log(`Generating sound effect from description: "${text}"`);

  try {
    // Call the API to generate the sound effect
    const stream = await client.textToSoundEffects.convert(params);

    log('Sound effect generated successfully');

    if (!stream) {
      throw new Error('Sound effect generation failed - no data received');
    }

    // Collect chunks from the stream
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    // Combine chunks into a single buffer
    const audioData = Buffer.concat(chunks);

    if (!audioData || audioData.length === 0) {
      throw new Error('Sound effect generation failed - empty audio data');
    }

    // Determine MIME type based on output format
    let mimeType = 'audio/mpeg'; // Default for MP3
    if (outputFormat?.startsWith('pcm_')) {
      mimeType = 'audio/wav';
    } else if (outputFormat?.startsWith('opus_')) {
      mimeType = 'audio/opus';
    }

    // Upload the audio file
    log('Uploading sound effect...');
    const fileUrl = await uploadFile(audioData, mimeType);

    log('Sound effect uploaded successfully');

    // Set the output variable to the URL of the uploaded file
    setOutput(outputVariable, fileUrl);
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error generating sound effect: ${errorMessage}`);
    throw error;
  }
};
