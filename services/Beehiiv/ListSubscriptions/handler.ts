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
  // Validate API key
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Beehiiv API Key. Please add your API key in the service configuration.',
    );
  }

  // Extract inputs
  const {
    publicationId,
    email,
    status,
    tier,
    limit,
    direction,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  // Initialize Beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  // Prepare query parameters
  const queryParams: Record<string, any> = {};

  // Add optional filters if provided
  if (email) {
    queryParams.email = email;
  }
  if (status && status !== 'all') {
    queryParams.status = status;
  }
  if (tier && tier !== 'all') {
    queryParams.tier = tier;
  }
  if (limit) {
    queryParams.limit = parseInt(limit, 10);
  }
  if (direction) {
    queryParams.direction = direction;
  }

  try {
    log(`Fetching subscriptions for publication: ${publicationId}`);

    // Make API request to list subscriptions
    const response = await client.subscriptions.list(
      publicationId,
      queryParams,
    );

    // Log success message with count
    const subscriptionCount = response.data?.length || 0;
    log(`Successfully retrieved ${subscriptionCount} subscriptions`);

    // Set output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors with clear messages
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
      } else {
        throw new Error(`Failed to fetch subscriptions: ${error.message}`);
      }
    } else {
      throw new Error('An unknown error occurred while fetching subscriptions');
    }
  }
};
