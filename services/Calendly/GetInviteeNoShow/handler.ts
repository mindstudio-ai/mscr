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

  const { inviteeUuid, outputVariable } = inputs;
  if (!inviteeUuid) {
    throw new Error('Missing invitee UUID. Please provide a valid UUID.');
  }

  log(`Retrieving no-show information for invitee: ${inviteeUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/invitee_no_shows/${inviteeUuid}`,
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
      log(`Error from Calendly API: ${response.status} ${response.statusText}`);

      if (response.status === 404) {
        throw new Error(
          `No-show record not found for invitee UUID: ${inviteeUuid}`,
        );
      } else if (response.status === 401) {
        throw new Error(
          'Unauthorized. Please check your Calendly authentication.',
        );
      } else {
        throw new Error(`Failed to retrieve no-show information: ${errorText}`);
      }
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved no-show information');

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving no-show information: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while retrieving no-show information',
      );
    }
  }
};
