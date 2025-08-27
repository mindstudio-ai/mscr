export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error('Missing API Key');
  }

  const { publicationId, subscriptionId, expandOptions, outputVariable } =
    inputs;

  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!subscriptionId) {
    throw new Error('Subscription ID is required');
  }

  log(
    `Fetching subscription ${subscriptionId} from publication ${publicationId}`,
  );

  // Build the URL with optional expand parameters
  let url = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subscriptionId}`;

  // Add expand parameters if any are selected
  if (expandOptions && expandOptions !== 'none') {
    url += `?expand[]=${expandOptions}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      log(
        `Error fetching subscription: ${response.status} ${response.statusText}`,
      );

      if (response.status === 404) {
        throw new Error(
          `Subscription or publication not found. Check your IDs.`,
        );
      } else if (response.status === 429) {
        throw new Error(`Rate limit exceeded. Please try again later.`);
      } else {
        throw new Error(`API error: ${response.status} ${errorText}`);
      }
    }

    const data = await response.json();
    log('Successfully retrieved subscription data');

    // Set the output variable with the subscription data
    setOutput(outputVariable, data.data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
