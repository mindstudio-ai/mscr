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
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Airtable authentication token. Please check your connection settings.',
    );
  }

  const { baseId, webhookId, outputVariable } = inputs;

  if (!baseId) {
    throw new Error('Base ID is required');
  }

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  log(`Refreshing webhook ${webhookId} in base ${baseId}...`);

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/bases/${baseId}/webhooks/${webhookId}/refresh`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || response.statusText;

      if (response.status === 401 || response.status === 403) {
        throw new Error(
          `Authentication error: ${errorMessage}. Please check your Airtable token.`,
        );
      } else if (response.status === 404) {
        throw new Error(
          `Not found: The base ID or webhook ID may be incorrect. ${errorMessage}`,
        );
      } else {
        throw new Error(
          `Airtable API error (${response.status}): ${errorMessage}`,
        );
      }
    }

    const data = await response.json();

    log(
      `Webhook successfully refreshed. New expiration time: ${data.expirationTime || 'No expiration'}`,
    );

    setOutput(outputVariable, {
      expirationTime: data.expirationTime,
    });
  } catch (error) {
    // Re-throw errors that we've already formatted
    if (
      error instanceof Error &&
      error.message.includes('Airtable API error')
    ) {
      throw error;
    }

    // Handle unexpected errors
    throw new Error(`Failed to refresh webhook: ${(error as Error).message}`);
  }
};
