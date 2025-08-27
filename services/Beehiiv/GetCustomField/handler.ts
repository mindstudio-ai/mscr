import { BeehiivClient } from 'beehiiv';

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
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, customFieldId, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!customFieldId) {
    throw new Error('Custom Field ID is required');
  }

  log(
    `Retrieving custom field ${customFieldId} from publication ${publicationId}...`,
  );

  try {
    // Initialize the Beehiiv client
    const client = new BeehiivClient({ token: apiKey });

    // Make the API request to get the custom field
    const response = await client.customFields.get(
      publicationId,
      customFieldId,
    );

    log('Successfully retrieved custom field data');

    // Set the output variable with the response data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle common error cases
    if (error.response?.status === 404) {
      throw new Error(
        `Custom field or publication not found. Please check your Publication ID and Custom Field ID.`,
      );
    } else if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please check your API key.');
    } else if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(
        `Failed to retrieve custom field: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
