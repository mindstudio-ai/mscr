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

  const { routingFormUuid, outputVariable } = inputs;
  if (!routingFormUuid) {
    throw new Error('Routing Form UUID is required');
  }

  log(`Retrieving details for routing form: ${routingFormUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/routing_forms/${routingFormUuid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Unauthorized: Please check your Calendly authentication credentials',
        );
      } else if (response.status === 404) {
        throw new Error(`Routing form with UUID ${routingFormUuid} not found`);
      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved routing form details');

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error retrieving routing form: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving the routing form',
    );
  }
};
