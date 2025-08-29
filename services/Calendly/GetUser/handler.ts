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

  const { outputVariable } = inputs;

  log('Fetching user information from Calendly...');

  try {
    const response = await fetch('https://api.calendly.com/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      const statusCode = response.status;

      if (statusCode === 401) {
        throw new Error(
          'Authentication failed. Please reconnect your Calendly account.',
        );
      } else if (statusCode === 403) {
        throw new Error(
          'You do not have permission to access this information.',
        );
      } else if (statusCode === 404) {
        throw new Error('User information not found.');
      } else {
        throw new Error(`Calendly API error (${statusCode}): ${errorText}`);
      }
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved user information');

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while connecting to Calendly');
  }
};
