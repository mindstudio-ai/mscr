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
    throw new Error('Missing authentication token');
  }

  const { webhookUuid, successVariable } = inputs;

  if (!webhookUuid) {
    throw new Error('Webhook UUID is required');
  }

  // Validate UUID format (basic validation)
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(webhookUuid)) {
    throw new Error(
      'Invalid webhook UUID format. Expected format: 00000000-0000-0000-0000-000000000000',
    );
  }

  log(`Deleting webhook subscription with UUID: ${webhookUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/webhook_subscriptions/${webhookUuid}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Handle different response status codes
    if (response.status === 204) {
      log('Webhook subscription deleted successfully');
      setOutput(successVariable, true);
      return;
    } else if (response.status === 401) {
      throw new Error(
        'Authentication failed. Please check your Calendly credentials.',
      );
    } else if (response.status === 404) {
      throw new Error(
        `Webhook subscription with UUID ${webhookUuid} not found`,
      );
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete webhook subscription: ${response.status} ${errorText}`,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while deleting the webhook subscription',
    );
  }
};
