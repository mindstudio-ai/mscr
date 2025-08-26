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
      'Missing API Key. Please configure the ElevenLabs API key in the service settings.',
    );
  }

  // Extract inputs
  const { dialogueInputs, modelId, outputFormat, outputVariable } = inputs;

  // Parse dialogue inputs JSON
  let parsedDialogueInputs;
  try {
    parsedDialogueInputs = JSON.parse(dialogueInputs);

    // Validate dialogue inputs
    if (
      !Array.isArray(parsedDialogueInputs) ||
      parsedDialogueInputs.length === 0
    ) {
      throw new Error('Dialogue inputs must be a non-empty array');
    }

    // Check if each dialogue input has the required fields
    parsedDialogueInputs.forEach((input, index) => {
      if (!input.text || !input.voiceId) {
        throw new Error(
          `Dialogue input at index ${index} is missing required 'text' or 'voiceId' fields`,
        );
      }
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        'Invalid JSON format for dialogue inputs. Please check your input format.',
      );
    }
    throw error;
  }

  // Initialize ElevenLabs client
  const client = new ElevenLabsClient({
    apiKey,
  });

  log(`Converting ${parsedDialogueInputs.length} dialogue inputs to speech`);

  try {
    // Format the inputs for the API
    const inputs = parsedDialogueInputs.map((input) => ({
      text: input.text,
      voiceId: input.voiceId,
    }));

    // Create request options
    const options = {
      model_id: modelId,
      output_format: outputFormat || 'mp3_44100_128',
      inputs,
    };

    // Call the text-to-dialogue API
    log('Making request to ElevenLabs text-to-dialogue API...');
    const stream = await client.textToDialogue.convert(options);

    if (!stream) {
      throw new Error(
        'Dialogue audio generation failed: no audio stream returned',
      );
    }

    log('Receiving audio stream from ElevenLabs...');

    // Process the audio stream
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const audioData = Buffer.concat(chunks);
    if (!audioData || audioData.length === 0) {
      throw new Error(
        'Dialogue audio generation failed: empty audio data received',
      );
    }

    log('Audio generation complete. Uploading audio file...');

    // Determine the MIME type based on the output format
    let mimeType = 'audio/mp3';
    if (outputFormat && outputFormat.startsWith('pcm_')) {
      mimeType = 'audio/wav';
    }

    // Upload the audio file
    const audioUrl = await uploadFile(audioData, mimeType);

    log('Audio file uploaded successfully');

    // Set the output variable
    setOutput(outputVariable, audioUrl);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ElevenLabs API error: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while processing the dialogue',
      );
    }
  }
};
