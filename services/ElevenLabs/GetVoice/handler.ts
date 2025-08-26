import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your ElevenLabs API key in the service settings.',
    );
  }

  // Extract inputs
  const { voiceId, outputVariable } = inputs;
  if (!voiceId) {
    throw new Error('Missing Voice ID. Please provide a valid voice ID.');
  }

  log(`Retrieving information for voice ID: ${voiceId}`);

  try {
    // Initialize the ElevenLabs client with the API key
    const client = new ElevenLabsClient({
      apiKey,
    });

    // Fetch voice information
    const voiceInfo = await client.voices.get(voiceId);

    log(
      `Successfully retrieved voice information for: ${voiceInfo.name || voiceId}`,
    );

    // Set the output variable with the voice information
    setOutput(outputVariable, voiceInfo);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Voice with ID "${voiceId}" not found. Please check the voice ID and try again.`,
        );
      } else if (
        error.message.includes('401') ||
        error.message.includes('403')
      ) {
        throw new Error(
          'Authentication failed. Please check your API key and try again.',
        );
      } else {
        throw new Error(
          `Failed to retrieve voice information: ${error.message}`,
        );
      }
    } else {
      throw new Error(
        'An unexpected error occurred while retrieving voice information.',
      );
    }
  }
};
