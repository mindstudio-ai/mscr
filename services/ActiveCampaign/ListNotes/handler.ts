export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please add your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const { outputVariable, limit, offset } = inputs;

  // Build URL with query parameters if provided
  let url = `https://${accountIdentifier}/api/3/notes`;
  const queryParams = new URLSearchParams();

  if (limit) {
    queryParams.append('limit', limit);
  }

  if (offset) {
    queryParams.append('offset', offset);
  }

  // Add query parameters to URL if any exist
  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  log('Retrieving notes from ActiveCampaign...');

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Extract notes from response
    const notes = data.notes || [];

    log(`Successfully retrieved ${notes.length} notes`);

    // Set the output variable
    setOutput(outputVariable, notes);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        throw new Error('Authentication failed. Please check your API Key.');
      } else if (error.message.includes('403')) {
        throw new Error("You don't have permission to access this resource.");
      } else if (error.message.includes('404')) {
        throw new Error('The requested resource was not found.');
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.message.includes('5')) {
        throw new Error('ActiveCampaign server error. Please try again later.');
      }
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving notes.');
  }
};
