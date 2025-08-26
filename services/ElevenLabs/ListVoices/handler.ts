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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error('Missing API Key');
  }

  const {
    search = '',
    voiceType = '',
    category = '',
    pageSize = '10',
    outputVariable,
  } = inputs;

  // Convert pageSize to number
  const pageSizeNum = parseInt(pageSize, 10) || 10;

  // Initialize the ElevenLabs client
  const client = new ElevenLabsClient({
    apiKey,
  });

  log('Fetching voices from ElevenLabs...');

  try {
    // Build query parameters
    const queryParams: Record<string, any> = {
      page_size: pageSizeNum,
    };

    // Only add parameters if they have values
    if (search) {
      queryParams.search = search;
    }
    if (voiceType) {
      queryParams.voice_type = voiceType;
    }
    if (category) {
      queryParams.category = category;
    }

    // Get voices from the API
    const voicesResponse = await client.voices.getAll(queryParams);

    if (!voicesResponse || !voicesResponse.voices) {
      throw new Error('Failed to retrieve voices');
    }

    // Format the response to return just the essential voice information
    const formattedVoices = voicesResponse.voices.map((voice) => ({
      id: voice.voiceId,
      name: voice.name,
      description: voice.description || '',
      category: voice.category || '',
      previewUrl: voice.previewUrl || '',
      settings: voice.settings || {},
      labels: voice.labels || {},
      verifiedLanguages: voice.verifiedLanguages || [],
    }));

    log(`Successfully retrieved ${formattedVoices.length} voices`);

    // Set the output variable with the formatted voices
    setOutput(outputVariable, formattedVoices);
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error fetching voices: ${errorMessage}`);
    throw error;
  }
};
