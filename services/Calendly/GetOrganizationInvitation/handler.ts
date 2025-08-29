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
  const { invitationUuid, outputVariable } = inputs;

  // Validate required inputs
  if (!invitationUuid) {
    throw new Error('Invitation UUID is required');
  }

  // Validate environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error(
      'Calendly API token is missing. Please check your connection settings.',
    );
  }

  // Log the start of the operation
  log(`Retrieving organization invitation details for UUID: ${invitationUuid}`);

  try {
    // Make the API request to Calendly
    const response = await fetch(
      `https://api.calendly.com/organization_invitations/${invitationUuid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Handle API response
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Invitation with UUID ${invitationUuid} not found`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your Calendly API token.',
        );
      } else {
        throw new Error(
          `Calendly API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    // Log success
    log('Successfully retrieved organization invitation details');

    // Set the output
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving the organization invitation',
    );
  }
};
