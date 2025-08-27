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
  // Extract inputs
  const {
    publicationId,
    tierId,
    includeStats = 'true',
    includePrices = 'true',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!tierId) {
    throw new Error('Tier ID is required');
  }

  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error('Missing API Key');
  }

  // Initialize the beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  // Build expand array based on user selections
  const expand: string[] = [];
  if (includeStats === 'true') {
    expand.push('stats');
  }
  if (includePrices === 'true') {
    expand.push('prices');
  }

  // Log the action
  log(`Retrieving tier ${tierId} from publication ${publicationId}`);

  try {
    // Make the API call
    const response = await client.tiers.getPublicationsPublicationIdTiersTierId(
      publicationId,
      tierId,
      { expand },
    );

    // Extract the tier data from the response
    const tierData = response.data;

    // Log success
    log(`Successfully retrieved tier: ${tierData.name}`);

    // Set the output variable with the tier data
    setOutput(outputVariable, tierData);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Tier not found. Please verify your Publication ID and Tier ID are correct.`,
        );
      } else if (
        error.message.includes('401') ||
        error.message.includes('403')
      ) {
        throw new Error(`Authentication error. Please check your API key.`);
      } else {
        throw new Error(`Error retrieving tier: ${error.message}`);
      }
    } else {
      throw new Error(`Unknown error occurred: ${String(error)}`);
    }
  }
};
