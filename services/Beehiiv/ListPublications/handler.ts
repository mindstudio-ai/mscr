import { BeehiivClient, Beehiiv } from 'beehiiv';

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
      'Missing API Key. Please add your beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { expandStats, limit, page, direction, orderBy, outputVariable } =
    inputs;

  // Initialize the beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  log('Fetching publications from beehiiv...');

  try {
    // Prepare request parameters
    const requestParams: Record<string, any> = {};

    // Add expand parameter if stats are requested
    if (expandStats && expandStats !== 'none') {
      requestParams.expand = expandStats;
    }

    // Add pagination parameters if provided
    if (limit) {
      requestParams.limit = parseInt(limit, 10);
    }

    if (page) {
      requestParams.page = parseInt(page, 10);
    }

    // Add sorting parameters if provided
    if (direction) {
      requestParams.direction = direction;
    }

    if (orderBy) {
      requestParams.order_by = orderBy;
    }

    // Make the API request to list publications
    const response = await client.publications.list(requestParams);

    // Log success message with publication count
    const publicationCount = response.data?.length || 0;
    log(
      `Successfully retrieved ${publicationCount} publication${publicationCount === 1 ? '' : 's'}`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error fetching publications: ${errorMessage}`);
    throw error;
  }
};
