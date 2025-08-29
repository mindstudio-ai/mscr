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
    throw new Error('Missing authentication token');
  }

  const { membershipUuid, outputVariable } = inputs;

  if (!membershipUuid) {
    throw new Error('Organization Membership UUID is required');
  }

  log(
    `Removing user with membership UUID: ${membershipUuid} from organization`,
  );

  try {
    const response = await fetch(
      `https://api.calendly.com/organization_memberships/${membershipUuid}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Handle different response status codes
    if (response.status === 204) {
      log('User successfully removed from organization');
      setOutput(outputVariable, {
        success: true,
        message: 'User successfully removed from organization',
      });
    } else if (response.status === 401) {
      throw new Error(
        'Authentication failed. Please check your Calendly credentials.',
      );
    } else if (response.status === 403) {
      throw new Error(
        "You don't have permission to remove this user from the organization.",
      );
    } else if (response.status === 404) {
      throw new Error(
        'Organization membership not found. Please check the UUID and try again.',
      );
    } else {
      const errorText = await response.text();
      throw new Error(
        `Failed to remove user: ${response.status} - ${errorText}`,
      );
    }
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    setOutput(outputVariable, {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};
