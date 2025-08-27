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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error('Missing API Key');
  }

  const {
    publicationId,
    automationId,
    email,
    subscriptionId,
    doubleOptOverride,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!automationId) {
    throw new Error('Automation ID is required');
  }

  if (!email && !subscriptionId) {
    throw new Error('Either Email or Subscription ID must be provided');
  }

  // Initialize the Beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  // Prepare the request payload
  const payload: Record<string, any> = {};

  if (email) {
    payload.email = email;
  }

  if (subscriptionId) {
    payload.subscription_id = subscriptionId;
  }

  if (doubleOptOverride) {
    payload.double_opt_override = doubleOptOverride;
  }

  try {
    log(`Adding ${email || subscriptionId} to automation ${automationId}`);

    // Make the API call
    const response = await client.automationJourneys.create(
      publicationId,
      automationId,
      payload,
    );

    log('Successfully added subscription to automation');

    // Set the output variable with the journey details
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle API errors
    const errorMessage = error.message || 'Unknown error occurred';
    log(`Error adding subscription to automation: ${errorMessage}`);
    throw error;
  }
};
