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
      'Missing API Key. Please configure your beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    publicationId,
    subscriptionId,
    tier,
    unsubscribe,
    stripeCustomerId,
    customFields,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!subscriptionId) {
    throw new Error('Subscription ID is required');
  }

  // Initialize the beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  // Prepare the request body
  const requestBody: Record<string, any> = {};

  // Add optional fields if provided
  if (tier !== undefined) {
    requestBody.tier = tier;
  }
  if (unsubscribe !== undefined) {
    // Convert string to boolean if needed
    requestBody.unsubscribe = unsubscribe === 'true' || unsubscribe === true;
  }
  if (stripeCustomerId) {
    requestBody.stripe_customer_id = stripeCustomerId;
  }
  if (customFields) {
    try {
      // customFields should already be parsed if it's a valid JSON
      requestBody.custom_fields = Array.isArray(customFields)
        ? customFields
        : JSON.parse(customFields);
    } catch (error) {
      throw new Error('Invalid JSON format for custom fields');
    }
  }

  log(
    `Updating subscription ${subscriptionId} in publication ${publicationId}...`,
  );

  try {
    // Make the API call to update the subscription
    const response = await client.subscriptions.put(
      publicationId,
      subscriptionId,
      requestBody,
    );

    log('Subscription updated successfully');

    // Set the output variable with the updated subscription data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        throw new Error(`Bad request: ${error.message}`);
      } else if (status === 404) {
        throw new Error(
          `Subscription or publication not found. Please check your IDs.`,
        );
      } else if (status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else if (status === 500) {
        throw new Error('Server error. Please try again later.');
      }
    }

    // Generic error handling
    throw new Error(`Failed to update subscription: ${error.message}`);
  }
};
