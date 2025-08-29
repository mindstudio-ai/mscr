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
  // Extract inputs
  const { organizationMembershipUuid, outputVariable } = inputs;

  // Validate inputs
  if (!organizationMembershipUuid) {
    throw new Error('Organization Membership UUID is required');
  }

  // Validate environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Calendly API token is missing');
  }

  // Log the action being performed
  log(
    `Retrieving organization membership details for UUID: ${organizationMembershipUuid}`,
  );

  try {
    // Make the API request to Calendly
    const response = await fetch(
      `https://api.calendly.com/organization_memberships/${organizationMembershipUuid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve organization membership: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const data = (await response.json()) as any;

    log('Successfully retrieved organization membership details');

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving organization membership details',
    );
  }
};
