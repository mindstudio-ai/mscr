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
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    publicationId,
    expandStats,
    expandPrices,
    limit,
    page,
    sortDirection,
    outputVariable,
  } = inputs;

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

  // Build expand array based on user selections
  const expandArray: string[] = [];
  if (expandStats === 'true') {
    expandArray.push('stats');
  }
  if (expandPrices === 'true') {
    expandArray.push('prices');
  }

  if (expandArray.length > 0) {
    queryParams.expand = expandArray;
  }

  // Add optional pagination and sorting parameters
  if (limit) {
    queryParams.limit = parseInt(limit, 10);
  }

  if (page) {
    queryParams.page = parseInt(page, 10);
  }

  if (sortDirection) {
    queryParams.direction = sortDirection;
  }

  log(`Retrieving tiers for publication: ${publicationId}`);

  try {
    // Make the API request
    const response = await client.tiers.getPublicationsPublicationIdTiers(
      publicationId,
      queryParams,
    );

    log(`Successfully retrieved ${response.data.length} tiers`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common error cases
    if (error.response?.status === 404) {
      throw new Error(`Publication not found: ${publicationId}`);
    } else if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please check your API key.');
    } else if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(
        `Error retrieving tiers: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
