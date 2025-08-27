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
  const { publicationId, automationId, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!automationId) {
    throw new Error('Automation ID is required');
  }

  log(
    `Retrieving automation ${automationId} from publication ${publicationId}...`,
  );

  try {
    // Initialize the Beehiiv client
    const client = new BeehiivClient({ token: apiKey });

    // Call the API to get automation details
    const response = await client.automations.get(publicationId, automationId);

    log(
      `Successfully retrieved automation: ${response.data?.name || automationId}`,
    );

    // Set the output variable with the automation data
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.status === 404) {
      throw new Error(
        `Automation not found. Please check your Publication ID and Automation ID.`,
      );
    } else if (error.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else {
      throw new Error(
        `Failed to retrieve automation: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
