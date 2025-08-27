export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  const { outputVariable } = inputs;

  // Validate API key
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  log('Retrieving workspace information from Beehiiv...');

  try {
    // Make request to Beehiiv API
    const response = await fetch(
      'https://api.beehiiv.com/v2/workspaces/identify',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Handle HTTP error responses
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 403) {
        throw new Error("You don't have permission to access this workspace.");
      } else if (response.status === 404) {
        throw new Error('Workspace not found.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Beehiiv API error (${response.status}): ${errorText}`);
      }
    }

    // Parse response
    const responseData = await response.json();

    if (!responseData.data) {
      throw new Error('Invalid response from Beehiiv API: missing data object');
    }

    // Transform the data to a more user-friendly format
    const workspaceInfo = {
      id: responseData.data.id,
      name: responseData.data.name,
      ownerEmail: responseData.data.owner_email,
    };

    log(
      `Successfully retrieved workspace information for: ${workspaceInfo.name}`,
    );

    // Set the output variable
    setOutput(outputVariable, workspaceInfo);
  } catch (error) {
    // Handle any errors that occurred during the request
    log('Failed to retrieve workspace information');
    throw error;
  }
};
