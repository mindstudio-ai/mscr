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
  const { outputVariable } = inputs;

  // Validate API key
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please add your API key in the connector settings.',
    );
  }

  log('Retrieving deal stages from Apollo...');

  try {
    // Make request to Apollo API
    const response = await fetch(
      'https://api.apollo.io/api/v1/opportunity_stages',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      },
    );

    // Handle response status
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 403) {
        throw new Error(
          'Authorization failed. This endpoint requires a master API key.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Apollo API request failed with status: ${response.status}`,
        );
      }
    }

    // Parse response
    const data = await response.json();

    if (!data.opportunity_stages || !Array.isArray(data.opportunity_stages)) {
      throw new Error('Unexpected response format from Apollo API');
    }

    log(`Successfully retrieved ${data.opportunity_stages.length} deal stages`);

    // Set output
    setOutput(outputVariable, data.opportunity_stages);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
