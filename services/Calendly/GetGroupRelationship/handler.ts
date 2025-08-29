export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs
  const { groupUuid, outputVariable } = inputs;

  // Validate required inputs
  if (!groupUuid) {
    throw new Error('Group UUID is required');
  }

  // Get authentication token from environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error('Calendly authentication token not found');
  }

  // Construct the API URL with query parameters
  const apiUrl = new URL('https://api.calendly.com/group_memberships');
  apiUrl.searchParams.append(
    'group',
    `https://api.calendly.com/organizations/*/groups/${groupUuid}`,
  );

  log(`Retrieving group relationship data for group UUID: ${groupUuid}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Calendly API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const data = (await response.json()) as any;

    log(
      `Successfully retrieved group relationship data with ${data.collection.length} member(s)`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Group with UUID '${groupUuid}' not found. Please verify the Group UUID is correct.`,
        );
      } else if (
        error.message.includes('401') ||
        error.message.includes('403')
      ) {
        throw new Error(
          'Authentication error. Please check your Calendly connection and permissions.',
        );
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw error;
    }
    throw new Error(
      'An unexpected error occurred while connecting to Calendly',
    );
  }
};
