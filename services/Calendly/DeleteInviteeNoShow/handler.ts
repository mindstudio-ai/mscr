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
    throw new Error('Missing Calendly authentication token');
  }

  const { inviteeNoShowUuid, outputVariable } = inputs;

  if (!inviteeNoShowUuid) {
    throw new Error('Invitee No-Show UUID is required');
  }

  log(`Removing no-show status for invitee with UUID: ${inviteeNoShowUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/invitee_no_shows/${inviteeNoShowUuid}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 204) {
      log('Successfully removed the no-show status');
      setOutput(
        outputVariable,
        'Successfully removed the no-show status for the invitee',
      );
      return;
    }

    // Handle error responses
    if (response.status === 404) {
      throw new Error(
        `No-show record with UUID ${inviteeNoShowUuid} not found`,
      );
    }

    if (response.status === 401 || response.status === 403) {
      throw new Error(
        'Authentication failed. Please check your Calendly credentials.',
      );
    }

    // For other error cases, try to get error details from response
    let errorDetails = 'Unknown error occurred';
    try {
      const errorData = (await response.json()) as any;
      errorDetails = errorData.message || JSON.stringify(errorData);
    } catch (e) {
      // If we can't parse the error response, use status text
      errorDetails = response.statusText;
    }

    throw new Error(
      `Failed to delete invitee no-show status: ${errorDetails} (Status: ${response.status})`,
    );
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`An unexpected error occurred: ${String(error)}`);
  }
};
