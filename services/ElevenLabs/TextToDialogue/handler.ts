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

  const { dialogueInputs, modelId, outputFormat, outputVariable } = inputs;

  // Validate dialogue inputs
  if (
    !dialogueInputs ||
    !Array.isArray(dialogueInputs) ||
    dialogueInputs.length === 0
  ) {
    throw new Error('Dialogue inputs must be a non-empty array');
  }

  // Initialize ElevenLabs client
  const client = new ElevenLabsClient({
    apiKey,
  });

  log(`Generating dialogue with ${dialogueInputs.length} inputs`);

  // Format inputs for the API
  const formattedInputs = dialogueInputs.map((input) => ({
    text: input.text,
    voiceId: input.voiceId,
  }));

  try {
    // Make the API request
    const options = {
      model_id: modelId,
      output_format: outputFormat,
    };

    // Call the text-to-dialogue API
    log('Sending request to ElevenLabs...');
    const stream = await client.textToDialogue.convert({
      inputs: formattedInputs,
      ...options,
    });

    if (!stream) {
      throw new Error('Audio generation failed - no stream returned');
    }

    log('Received audio stream from ElevenLabs');

    // Collect all chunks from the stream
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    // Combine chunks into a single buffer
    const audioData = Buffer.concat(chunks);

    if (!audioData || audioData.length === 0) {
      throw new Error('Audio generation failed - empty data received');
    }

    log('Audio generation complete, uploading file...');

    // Determine MIME type based on output format
    let mimeType = 'audio/mp3';
    if (outputFormat && outputFormat.startsWith('pcm')) {
      mimeType = 'audio/wav';
    }

    // Upload the audio file
    const uploadResult = await uploadFile(audioData, mimeType);

    log('Audio file uploaded successfully');

    // Set the output variable to the uploaded file URL
    setOutput(outputVariable, uploadResult);
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
