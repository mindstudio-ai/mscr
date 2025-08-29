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
      'Missing authentication token. Please check your Calendly connection.',
    );
  }

  const { userUri, outputVariable } = inputs;

  if (!userUri) {
    throw new Error(
      'User URI is required. Please provide a valid Calendly user URI.',
    );
  }

  log(`Retrieving availability schedules for user: ${userUri}`);

  try {
    // Make request to Calendly API to get user availability schedules
    const response = await fetch(
      `https://api.calendly.com/user_availability_schedules?user=${userUri}`,
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
          'Authentication failed. Please check your Calendly connection.',
        );
      } else if (response.status === 404) {
        throw new Error('User not found. Please check the User URI provided.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.collection.length} availability schedules`,
    );

    // Set the output variable with the schedules data
    setOutput(outputVariable, data.collection);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unexpected error occurred while retrieving availability schedules',
    );
  }
};
