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
      'Missing API Key. Please configure your ElevenLabs API key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    dialogueInputs,
    modelId,
    outputFormat,
    stability,
    speakerBoost,
    outputVariable,
  } = inputs;

  // Validate dialogue inputs
  if (
    !dialogueInputs ||
    !Array.isArray(dialogueInputs) ||
    dialogueInputs.length === 0
  ) {
    throw new Error(
      'Dialogue inputs must be a non-empty array of objects with text and voiceId properties.',
    );
  }

  // Initialize ElevenLabs client
  const client = new ElevenLabsClient({
    apiKey,
  });

  // Prepare request parameters
  const requestParams: any = {
    inputs: dialogueInputs.map((input: any) => ({
      text: input.text,
      voice_id: input.voiceId, // Map to the API's expected format
    })),
    model_id: modelId,
    outputFormat,
  };

  // Add optional settings if provided
  if (stability || speakerBoost) {
    requestParams.settings = {};

    if (stability) {
      const stabilityValue = parseFloat(stability);
      if (isNaN(stabilityValue) || stabilityValue < 0 || stabilityValue > 1) {
        throw new Error('Stability must be a number between 0 and 1.');
      }
      requestParams.settings.stability = stabilityValue;
    }

    if (speakerBoost) {
      requestParams.settings.use_speaker_boost = speakerBoost === 'true';
    }
  }

  log(
    `Creating dialogue with ${dialogueInputs.length} inputs using model ${modelId}`,
  );

  try {
    // Make the API request with output format as a query parameter
    const stream = await client.textToDialogue.convert(requestParams);

    log('Received dialogue audio stream from ElevenLabs');

    if (!stream) {
      throw new Error('Dialogue generation failed - no audio data received');
    }

    // Collect chunks from the stream
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    // Combine chunks into a single buffer
    const audioData = Buffer.concat(chunks);

    if (!audioData || audioData.length === 0) {
      throw new Error('Dialogue generation failed - empty audio data received');
    }

    // Determine the MIME type based on the output format
    let mimeType = 'audio/mpeg'; // Default for MP3
    if (outputFormat.startsWith('pcm_')) {
      mimeType = 'audio/wav';
    } else if (outputFormat.startsWith('opus_')) {
      mimeType = 'audio/opus';
    }

    // Upload the audio file
    log('Uploading dialogue audio file...');
    const audioUrl = await uploadFile(audioData, mimeType);

    log('Dialogue audio successfully generated and uploaded');

    // Set the output variable to the URL of the uploaded audio file
    setOutput(outputVariable, audioUrl);
  } catch (error) {
    // Handle API errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error generating dialogue: ${errorMessage}`);
    throw error;
  }
};
