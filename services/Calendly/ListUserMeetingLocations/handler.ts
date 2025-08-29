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

  const { userUuid, outputVariable } = inputs;
  if (!userUuid) {
    throw new Error(
      'User UUID is required. Please provide a valid Calendly user UUID.',
    );
  }

  log(`Retrieving meeting locations for user ${userUuid}...`);

  try {
    const response = await fetch(
      `https://api.calendly.com/users/${userUuid}/meeting_locations`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please reconnect your Calendly account.',
        );
      } else if (response.status === 404) {
        throw new Error(
          `User with UUID ${userUuid} not found. Please check the UUID and try again.`,
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
      `Successfully retrieved ${data.collection?.length || 0} meeting locations`,
    );

    // Store the entire response in the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
