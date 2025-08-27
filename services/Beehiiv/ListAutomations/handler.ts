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
      'Missing API Key. Please configure your Beehiiv API Key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, limit, page, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Initialize the Beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  // Prepare query parameters
  const queryParams: Record<string, any> = {};

  if (limit) {
    queryParams.limit = parseInt(limit, 10);
    if (
      isNaN(queryParams.limit) ||
      queryParams.limit < 1 ||
      queryParams.limit > 100
    ) {
      throw new Error('Limit must be a number between 1 and 100');
    }
  }

  if (page) {
    queryParams.page = parseInt(page, 10);
    if (isNaN(queryParams.page) || queryParams.page < 1) {
      throw new Error('Page must be a positive number');
    }
  }

  try {
    // Log the operation
    log(`Fetching automations for publication ${publicationId}...`);

    // Make the API call
    const response = await client.automations.list(publicationId, queryParams);

    // Log success
    const automationCount = response.data?.length || 0;
    log(
      `Successfully retrieved ${automationCount} automation${automationCount === 1 ? '' : 's'}`,
    );

    // Set the output
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Publication with ID ${publicationId} not found. Please check your Publication ID.`,
        );
      } else if (
        error.message.includes('401') ||
        error.message.includes('403')
      ) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (error.message.includes('429')) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(`Error fetching automations: ${error.message}`);
      }
    } else {
      throw new Error('An unknown error occurred while fetching automations');
    }
  }
};
