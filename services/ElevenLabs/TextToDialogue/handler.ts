import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { BodyTextToDialogueMultiVoiceV1TextToDialoguePost } from '@elevenlabs/elevenlabs-js/api';

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
      'Missing API Key. Please configure your ElevenLabs API key in the service settings.',
    );
  }

  // Extract inputs
  const {
    dialogueInputs,
    modelId = 'eleven_v3',
    outputFormat = 'mp3_44100_128',
    stability,
    useSpeakerBoost,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (
    !dialogueInputs ||
    !Array.isArray(dialogueInputs) ||
    dialogueInputs.length === 0
  ) {
    throw new Error(
      'Dialogue inputs must be a non-empty array of dialogue entries.',
    );
  }

  // Validate dialogue inputs structure
  dialogueInputs.forEach((input, index) => {
    if (!input.text || !input.voiceId) {
      throw new Error(
        `Dialogue input at index ${index} is missing required 'text' or 'voiceId' field.`,
      );
    }
  });

  // Initialize ElevenLabs client
  const client = new ElevenLabsClient({
    apiKey,
  });

  // Prepare settings object if stability or useSpeakerBoost is provided
  const settings: Record<string, any> = {};
  if (stability) {
    settings.stability = parseFloat(stability);
  }
  if (useSpeakerBoost) {
    settings.use_speaker_boost = useSpeakerBoost === 'true';
  }

  // Prepare request parameters
  const params: BodyTextToDialogueMultiVoiceV1TextToDialoguePost = {
    inputs: dialogueInputs.map((input) => ({
      text: input.text,
      voiceId: input.voiceId,
    })),
    modelId: modelId,
    outputFormat,
  };

  // Add settings if any were provided
  if (Object.keys(settings).length > 0) {
    params.settings = settings;
  }

  log(
    `Creating dialogue with ${dialogueInputs.length} entries using model ${modelId}`,
  );

  try {
    // Make the API request with streaming enabled
    const stream = await client.textToDialogue.convert(params);

    log('Received audio stream from ElevenLabs');

    if (!stream) {
      throw new Error('Failed to generate dialogue audio');
    }

    // Collect all chunks of the audio stream
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    // Combine chunks into a single buffer
    const audioData = Buffer.concat(chunks);

    if (!audioData || audioData.length === 0) {
      throw new Error('Generated audio is empty');
    }

    log('Audio generation complete');

    // Determine MIME type based on output format
    let mimeType = 'audio/mp3';
    if (outputFormat.startsWith('pcm_')) {
      mimeType = 'audio/wav';
    } else if (outputFormat.startsWith('opus_')) {
      mimeType = 'audio/opus';
    }

    // Upload the audio file
    const audioUrl = await uploadFile(audioData, mimeType);
    log('Audio uploaded successfully');

    // Set the output variable to the URL of the uploaded file
    setOutput(outputVariable, audioUrl);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error generating dialogue: ${errorMessage}`);
    throw error;
  }
};
