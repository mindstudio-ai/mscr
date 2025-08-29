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
  const { outputVariable } = inputs;

  if (!token) {
    throw new Error(
      'Missing authentication token. Please reconnect your Calendly account.',
    );
  }

  log('Fetching your Calendly user information...');

  try {
    const response = await fetch('https://api.calendly.com/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Handle common error responses
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please reconnect your Calendly account.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        const errorText = await response.text();
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;
    log(
      `Successfully retrieved user information for ${data.resource?.name || 'your account'}`,
    );

    // Set the entire response as the output
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to retrieve Calendly user information: ${error.message}`,
      );
    } else {
      throw new Error(
        'An unknown error occurred while retrieving Calendly user information',
      );
    }
  }
};
