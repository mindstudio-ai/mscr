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
    throw new Error(
      'Missing authentication token. Please check your Calendly connection.',
    );
  }

  const { invitationUuid, outputVariable } = inputs;
  if (!invitationUuid) {
    throw new Error(
      'Missing invitation UUID. Please provide a valid invitation UUID.',
    );
  }

  log(`Revoking organization invitation with UUID: ${invitationUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/organization_invitations/${invitationUuid}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          'Invitation not found. Please check the UUID and try again.',
        );
      } else if (response.status === 403) {
        throw new Error(
          'You do not have permission to revoke this invitation.',
        );
      } else {
        const errorText = await response.text();
        throw new Error(
          `Failed to revoke invitation: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }
    }

    // 204 No Content is the expected successful response
    log('Invitation successfully revoked');
    setOutput(
      outputVariable,
      `Invitation ${invitationUuid} was successfully revoked`,
    );
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
