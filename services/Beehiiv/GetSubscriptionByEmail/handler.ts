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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, email, expandFields, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!email) {
    throw new Error('Email address is required');
  }

  // URL encode the email address
  const encodedEmail = encodeURIComponent(email);

  // Construct the base URL
  let url = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/by_email/${encodedEmail}`;

  // Add expand query parameter if specified
  if (expandFields && expandFields !== 'none') {
    const expandParams =
      expandFields === 'all'
        ? ['stats', 'custom_fields', 'referrals', 'tags']
        : [expandFields];

    const queryParams = new URLSearchParams();
    expandParams.forEach((param) => {
      queryParams.append('expand[]', param);
    });

    url = `${url}?${queryParams.toString()}`;
  }

  log(`Retrieving subscription information for ${email}...`);

  try {
    // Make the request to Beehiiv API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message || `HTTP error ${response.status}`;

      if (response.status === 404) {
        throw new Error(`Subscription not found for email: ${email}`);
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(`Beehiiv API error: ${errorMessage}`);
      }
    }

    // Parse the response
    const data = await response.json();

    log(`Successfully retrieved subscription information for ${email}`);

    // Set the output variable with the subscription data
    setOutput(outputVariable, data.data);
  } catch (error) {
    // Handle any errors
    log(
      `Error retrieving subscription: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
