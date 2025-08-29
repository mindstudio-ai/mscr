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

  const { organizationUuid, email, outputVariable } = inputs;

  if (!organizationUuid) {
    throw new Error('Organization UUID is required');
  }

  if (!email) {
    throw new Error('Email address is required');
  }

  log(`Inviting ${email} to join your Calendly organization`);

  try {
    const response = await fetch(
      `https://api.calendly.com/organizations/${organizationUuid}/invitations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
        }),
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as any;
      const errorMessage =
        errorData.message || `Error: ${response.status} ${response.statusText}`;

      if (response.status === 404) {
        throw new Error(
          `Organization not found. Please check your Organization UUID.`,
        );
      } else if (response.status === 422) {
        throw new Error(
          `Invalid request: ${errorMessage}. The user may already be a member.`,
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Calendly API error: ${errorMessage}`);
      }
    }

    const result = (await response.json()) as any;
    log(`Successfully sent invitation to ${email}`);

    if (outputVariable) {
      setOutput(outputVariable, result);
    }
  } catch (error) {
    if (error instanceof Error) {
      log(`Failed to send invitation: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while sending the invitation');
  }
};
