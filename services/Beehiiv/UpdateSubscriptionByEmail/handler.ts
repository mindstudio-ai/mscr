export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
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
    email,
    tier,
    stripeCustomerId,
    unsubscribe,
    customFields,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!email) {
    throw new Error('Subscriber email is required');
  }

  // Construct the API URL with URL-encoded email
  const encodedEmail = encodeURIComponent(email);
  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/by_email/${encodedEmail}`;

  log(`Preparing to update subscription for ${email}`);

  // Build request body with only provided fields
  const requestBody: Record<string, any> = {};

  if (tier) {
    requestBody.tier = tier;
  }

  if (stripeCustomerId) {
    requestBody.stripe_customer_id = stripeCustomerId;
  }

  if (unsubscribe !== undefined) {
    // Convert string 'true'/'false' to boolean if needed
    requestBody.unsubscribe = unsubscribe === 'true' || unsubscribe === true;
  }

  if (customFields) {
    // Parse customFields if it's a string, otherwise use as is
    const parsedCustomFields =
      typeof customFields === 'string'
        ? JSON.parse(customFields)
        : customFields;

    requestBody.custom_fields = parsedCustomFields;
  }

  try {
    log('Sending update request to Beehiiv...');

    // Make the API request
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      const errorCode = response.status;

      if (errorCode === 404) {
        throw new Error(`Subscriber not found: ${errorMessage}`);
      } else if (errorCode === 400) {
        throw new Error(`Bad request: ${errorMessage}`);
      } else if (errorCode === 429) {
        throw new Error(`Rate limit exceeded: ${errorMessage}`);
      } else {
        throw new Error(`Error ${errorCode}: ${errorMessage}`);
      }
    }

    log('Successfully updated subscription');

    // Set the output variable with the response data
    setOutput(outputVariable, responseData.data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error updating subscription: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while updating the subscription',
    );
  }
};
