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
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  log('Retrieving your Canva user profile...');

  try {
    const response = await fetch(
      'https://api.canva.com/rest/v1/users/me/profile',
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
          'Authentication failed. Please check your Canva connection and ensure you have the correct permissions.',
        );
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. Canva allows 10 requests per minute per user.',
        );
      } else {
        throw new Error(
          `Canva API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    const data = (await response.json()) as any;

    log(`Successfully retrieved profile for ${data.profile.display_name}`);

    // Set the entire response as the output
    setOutput(outputVariable, data);
  } catch (error) {
    log('Failed to retrieve Canva user profile');
    throw error;
  }
};
