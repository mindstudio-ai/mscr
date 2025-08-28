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
  // Check for API key
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your ElevenLabs API key in the service settings.',
    );
  }

  // Extract inputs
  const {
    audioFile,
    voiceId,
    modelId = 'eleven_multilingual_sts_v2',
    outputFormat = 'mp3_44100_128',
    removeBackgroundNoise = 'false',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!audioFile) {
    throw new Error('Missing audio file URL');
  }
  if (!voiceId) {
    throw new Error('Missing Voice ID');
  }

  try {
    // Download the audio file
    log('Downloading audio file...');
    const response = await fetch(audioFile);

    if (!response.ok) {
      throw new Error(`Failed to download audio file: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const audioData = Buffer.from(audioBuffer);

    log('Audio file downloaded successfully');

    // Initialize the ElevenLabs client
    const client = new ElevenLabsClient({
      apiKey,
    });

    // Prepare options for voice conversion
    const options = {
      audio: audioData,
      modelId,
      outputFormat,
      removeBackgroundNoise: removeBackgroundNoise === 'true',
    };

    // Log the conversion process
    log(`Converting audio using voice ID: ${voiceId}`);

    // Call the ElevenLabs API to convert the audio
    const stream = await client.speechToSpeech.convert(voiceId, options);

    if (!stream) {
      throw new Error('Voice conversion failed - no data returned');
    }

    log('Voice conversion completed successfully');

    // Collect all chunks from the stream
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    // Combine chunks into a single buffer
    const resultData = Buffer.concat(chunks);

    if (!resultData || resultData.length === 0) {
      throw new Error('Voice conversion failed - empty result');
    }

    // Determine the MIME type based on the output format
    let mimeType = 'audio/mp3'; // Default for MP3
    if (outputFormat.startsWith('pcm_')) {
      mimeType = 'audio/wav';
    } else if (outputFormat.startsWith('opus_')) {
      mimeType = 'audio/opus';
    }

    // Upload the converted audio file
    log('Uploading converted audio file...');
    const uploadResult = await uploadFile(resultData, mimeType);

    log('Audio file uploaded successfully');

    // Set the output variable to the URL of the uploaded file
    setOutput(outputVariable, uploadResult);
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
