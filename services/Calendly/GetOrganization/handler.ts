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
      'Missing authentication token. Please reconnect your Calendly account.',
    );
  }

  const { organizationUuid, outputVariable } = inputs;
  if (!organizationUuid) {
    throw new Error('Organization UUID is required');
  }

  log(`Retrieving details for organization: ${organizationUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/organizations/${organizationUuid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please reconnect your Calendly account.',
        );
      } else if (response.status === 404) {
        throw new Error(
          `Organization with UUID ${organizationUuid} not found.`,
        );
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved organization details');

    // Set the entire response as the output
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      `Failed to retrieve organization details: ${String(error)}`,
    );
  }
};
