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

  // Validate that we have the required token
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  log('Fetching your Canva capabilities...');

  try {
    // Make the request to the Canva API
    const response = await fetch(
      'https://api.canva.com/rest/v1/users/me/capabilities',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva connection and ensure your token is valid.',
        );
      } else if (response.status === 403) {
        throw new Error(
          "You don't have permission to access this resource. Please check your Canva account permissions.",
        );
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. This operation is limited to 10 requests per minute.',
        );
      } else {
        throw new Error(`Canva API error (${response.status}): ${errorText}`);
      }
    }

    // Parse the response
    const data = (await response.json()) as { capabilities: string[] };

    // Extract capabilities from response
    const capabilities = data.capabilities || [];

    log(
      `Successfully retrieved ${capabilities.length} capabilities from your Canva account.`,
    );

    // Set the output variable with the capabilities array
    setOutput(outputVariable, capabilities);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${error}`);
    }
  }
};
