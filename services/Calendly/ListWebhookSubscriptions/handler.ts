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

  const {
    organizationUrl,
    scope,
    count = '10',
    pageToken,
    outputVariable,
  } = inputs;

  if (!organizationUrl) {
    throw new Error('Organization URL is required');
  }

  // Build the URL with query parameters
  const url = new URL('https://api.calendly.com/webhook_subscriptions');

  // Add organization parameter
  url.searchParams.append('organization', organizationUrl);

  // Add optional parameters if provided
  if (scope) {
    url.searchParams.append('scope', scope);
  }

  if (count) {
    url.searchParams.append('count', count);
  }

  if (pageToken) {
    url.searchParams.append('page_token', pageToken);
  }

  log(`Fetching webhook subscriptions from Calendly...`);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Handle common error status codes with helpful messages
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly credentials.',
        );
      } else if (response.status === 403) {
        throw new Error(
          "You don't have permission to access these webhook subscriptions.",
        );
      } else if (response.status === 404) {
        throw new Error('The specified organization was not found.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.collection?.length || 0} webhook subscriptions`,
    );

    // Set the output variable with the webhook subscriptions data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while fetching webhook subscriptions',
    );
  }
};
