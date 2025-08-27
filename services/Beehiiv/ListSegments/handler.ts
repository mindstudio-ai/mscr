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
      'Missing API Key. Please configure your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    publicationId,
    type = 'all',
    status = 'all',
    limit = '10',
    page = '1',
    orderBy = 'created',
    direction = 'asc',
    includeStats = 'true',
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
  const queryParams: Record<string, any> = {
    type,
    status,
    limit: parseInt(limit, 10),
    page: parseInt(page, 10),
    order_by: orderBy,
    direction,
  };

  // Add expand parameter if stats are requested
  if (includeStats === 'true') {
    queryParams.expand = ['stats'];
  }

  log(`Fetching segments for publication: ${publicationId}`);

  try {
    // Call the Beehiiv API to list segments
    const response = await client.segments.list(publicationId, queryParams);

    log(
      `Successfully retrieved ${response.data.length} segments (page ${response.page} of ${response.total_pages})`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error fetching segments: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching segments');
  }
};
