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
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, limit, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Initialize the beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  // Prepare parameters for the API call
  const params: Record<string, any> = {};
  if (limit) {
    params.limit = limit;
  }

  try {
    log(`Fetching webhooks for publication: ${publicationId}`);

    // Make the API call to get webhooks
    const response = await client.webhooks.getWebhooks(publicationId, params);

    // Set the output variable with the webhooks data
    setOutput(outputVariable, response.data);

    log(`Successfully retrieved ${response.data.length} webhooks`);
  } catch (error: any) {
    // Handle common API errors
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        throw new Error(
          'Bad request: Please check your publication ID and limit values',
        );
      } else if (status === 404) {
        throw new Error(`Publication with ID ${publicationId} not found`);
      } else if (status === 429) {
        throw new Error('Too many requests: Please try again later');
      } else if (status === 500) {
        throw new Error('beehiiv server error: Please try again later');
      }
    }

    // Generic error handling
    throw new Error(
      `Failed to fetch webhooks: ${error.message || 'Unknown error'}`,
    );
  }
};
