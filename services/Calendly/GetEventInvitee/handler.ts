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
      'Missing authentication token. Please reconnect your Calendly account.',
    );
  }

  const { eventUuid, inviteeUuid, outputVariable } = inputs;

  if (!eventUuid) {
    throw new Error('Event UUID is required');
  }

  if (!inviteeUuid) {
    throw new Error('Invitee UUID is required');
  }

  log(
    `Retrieving information for invitee ${inviteeUuid} of event ${eventUuid}`,
  );

  try {
    const response = await fetch(
      `https://api.calendly.com/scheduled_events/${eventUuid}/invitees/${inviteeUuid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your Calendly connection or permissions.',
        );
      } else if (response.status === 404) {
        throw new Error(
          'Event or invitee not found. Please verify the UUIDs are correct.',
        );
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved invitee information');

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to retrieve invitee information: ${String(error)}`);
  }
};
