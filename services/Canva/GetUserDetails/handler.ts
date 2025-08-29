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
      'Missing Canva API token. Please check your connection settings.',
    );
  }

  log('Fetching Canva user details...');

  try {
    // Make the API request to get user details
    const response = await fetch('https://api.canva.com/rest/v1/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to get user details: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const data = (await response.json()) as {
      team_user: {
        user_id: string;
        team_id: string;
      };
    };

    log('Successfully retrieved user details');

    // Set the output variable with the user details
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    log('Error fetching user details from Canva');
    throw error;
  }
};
