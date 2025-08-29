export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Calendly connection.',
    );
  }

  const { groupUuid, outputVariable } = inputs;
  if (!groupUuid) {
    throw new Error('Group UUID is required.');
  }

  const baseUrl = 'https://api.calendly.com';
  const endpoint = `/groups/${groupUuid}`;

  log(`Fetching details for group: ${groupUuid}`);

  try {
    // Make the API request to get group details
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Handle different error responses
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly connection.',
        );
      } else if (response.status === 403) {
        throw new Error('You do not have permission to access this group.');
      } else if (response.status === 404) {
        throw new Error(`Group with UUID "${groupUuid}" not found.`);
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Calendly API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    log('Successfully retrieved group details');

    // Set the output with the group details
    setOutput(outputVariable, data.resource);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw new Error(`Failed to get group details: ${error.message}`);
    } else {
      throw new Error(
        'An unexpected error occurred while fetching group details',
      );
    }
  }
};
