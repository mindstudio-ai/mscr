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
  const { publicationId, automationId, automationJourneyId, outputVariable } =
    inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!automationId) {
    throw new Error('Automation ID is required');
  }
  if (!automationJourneyId) {
    throw new Error('Automation Journey ID is required');
  }

  try {
    // Initialize the Beehiiv client
    log('Initializing Beehiiv client...');
    const client = new BeehiivClient({ token: apiKey });

    // Fetch the automation journey
    log(`Fetching automation journey with ID: ${automationJourneyId}...`);
    const response = await client.automationJourneys.get(
      publicationId,
      automationId,
      automationJourneyId,
    );

    // Set the output variable with the response data
    log('Successfully retrieved automation journey details');
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        throw new Error(
          'Bad request: The request was invalid. Please check your input parameters.',
        );
      } else if (status === 404) {
        throw new Error(
          'Not found: The requested automation journey could not be found. Please verify the IDs are correct.',
        );
      } else if (status === 429) {
        throw new Error(
          'Rate limit exceeded: Too many requests. Please try again later.',
        );
      } else if (status === 500) {
        throw new Error(
          'Server error: An error occurred on the Beehiiv server. Please try again later.',
        );
      }
    }

    // Generic error handling
    throw new Error(
      `Error fetching automation journey: ${error.message || 'Unknown error'}`,
    );
  }
};
