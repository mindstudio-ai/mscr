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

  const { webhookEvent, outputVariable } = inputs;

  log(`Fetching sample webhook data for event type: ${webhookEvent}`);

  try {
    // Make request to Calendly API to get sample webhook data
    const response = await fetch(
      'https://api.calendly.com/webhook_subscriptions/sample',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // The query parameter tells Calendly which event type we want sample data for
        // This is passed as a query parameter according to the Calendly API
        params: {
          event: webhookEvent,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Calendly API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as any;

    log('Successfully retrieved sample webhook data');

    // Save the webhook data to the specified output variable
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occur during the API request
    log(
      `Error fetching sample webhook data: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
