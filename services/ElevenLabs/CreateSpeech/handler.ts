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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error('Missing API Key');
  }

  // Extract inputs
  const {
    dialogueInputs,
    modelId,
    outputFormat,
    stability,
    useSpeakerBoost,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!dialogueInputs || !Array.isArray(dialogueInputs)) {
    throw new Error('Dialogue inputs must be a valid array');
  }

  if (dialogueInputs.length === 0) {
    throw new Error('At least one dialogue input is required');
  }

  // Initialize the ElevenLabs client
  const client = new ElevenLabsClient({
    apiKey,
  });

  // Prepare the settings object
  const settings: Record<string, any> = {};

  // Add optional settings if provided
  if (stability !== undefined && stability !== '') {
    settings.stability = parseFloat(stability);
  }

  if (useSpeakerBoost !== undefined) {
    settings.use_speaker_boost = useSpeakerBoost === 'true';
  }

  // Prepare the request payload
  const payload = {
    inputs: dialogueInputs.map((input: any) => ({
      text: input.text,
      voiceId: input.voiceId,
    })),
    model_id: modelId,
    outputFormat,
    ...(Object.keys(settings).length > 0 ? { settings } : {}),
  };

  log(
    `Creating dialogue with ${dialogueInputs.length} inputs using model ${modelId}`,
  );

  try {
    // Make the API call to generate the dialogue
    const audioStream = await client.textToDialogue.convert(payload);

    log('Received audio stream from ElevenLabs');

    if (!audioStream) {
      throw new Error('Dialogue generation failed - no audio received');
    }

    // Collect all chunks of the audio stream
    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    // Combine chunks into a single buffer
    const audioData = Buffer.concat(chunks);

    if (!audioData || audioData.length === 0) {
      throw new Error('Dialogue generation failed - empty audio data');
    }

    log(
      `Successfully generated dialogue audio (${(audioData.length / 1024).toFixed(2)} KB)`,
    );

    // Determine the MIME type based on the output format
    let mimeType = 'audio/mpeg';
    if (outputFormat.startsWith('pcm_')) {
      mimeType = 'audio/wav';
    } else if (outputFormat.startsWith('opus_')) {
      mimeType = 'audio/opus';
    }

    // Upload the audio file
    const audioUrl = await uploadFile(audioData, mimeType);
    log('Uploaded dialogue audio to CDN');

    // Set the output variable to the URL of the uploaded file
    setOutput(outputVariable, audioUrl);
  } catch (error) {
    log(`Error generating dialogue: ${(error as Error).message}`);
    throw error;
  }
};
