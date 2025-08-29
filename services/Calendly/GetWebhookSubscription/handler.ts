export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Calendly connection settings.',
    );
  }

  const { webhookUuid, outputVariable } = inputs;
  if (!webhookUuid) {
    throw new Error('Webhook UUID is required');
  }

  log(`Retrieving webhook subscription with UUID: ${webhookUuid}`);

  try {
    // Make the API request to get webhook subscription details
    const response = await fetch(
      `https://api.calendly.com/webhook_subscriptions/${webhookUuid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve webhook subscription: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const data = (await response.json()) as any;

    log('Successfully retrieved webhook subscription details');

    // Set the output variable with the webhook subscription details
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
