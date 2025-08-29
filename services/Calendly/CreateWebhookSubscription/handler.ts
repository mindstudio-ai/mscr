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
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing authentication token');
  }

  const { callbackUrl, events, scope, signingKey, outputVariable } = inputs;

  // Validate required inputs
  if (!callbackUrl) {
    throw new Error('Callback URL is required');
  }

  if (!events) {
    throw new Error('At least one event is required');
  }

  // Convert comma-separated events string to array
  const eventsArray = events.split(',').map((event) => event.trim());

  log(
    `Creating webhook subscription for ${eventsArray.length} events with scope: ${scope}`,
  );

  // Prepare request body
  const requestBody: Record<string, any> = {
    url: callbackUrl,
    events: eventsArray,
    scope,
  };

  // Add signing key if provided
  if (signingKey) {
    requestBody.signing_key = signingKey;
    log('Webhook will be signed with the provided signing key');
  }

  try {
    // Make API request to create webhook subscription
    const response = await fetch(
      'https://api.calendly.com/webhook_subscriptions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ webhook_subscription: requestBody }),
      },
    );

    // Parse response
    const responseData = (await response.json()) as any;

    // Handle error responses
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(`Calendly API error: ${errorMessage}`);
    }

    log('Webhook subscription created successfully');

    // Set output with webhook subscription details
    setOutput(outputVariable, {
      id: responseData.resource.uri,
      callbackUrl: responseData.resource.url,
      events: responseData.resource.events,
      scope: responseData.resource.scope,
      createdAt: responseData.resource.created_at,
      state: responseData.resource.state,
      ...(responseData.resource.signing_key && { signingKeyPresent: true }),
    });
  } catch (error) {
    if (error instanceof Error) {
      log(`Error creating webhook subscription: ${error.message}`);
      throw error;
    }
    throw new Error(
      'Unknown error occurred while creating webhook subscription',
    );
  }
};
