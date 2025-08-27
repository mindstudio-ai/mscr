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
    throw new Error(
      'Missing Apollo API Key. Please add your API key in the connector settings.',
    );
  }

  const { emailId, outputVariable } = inputs;
  if (!emailId) {
    throw new Error('Email ID is required. Please provide a valid email ID.');
  }

  log(`Fetching statistics for email ID: ${emailId}`);

  try {
    const response = await fetch(
      `https://api.apollo.io/api/v1/emailer_messages/${emailId}/activities`,
      {
        method: 'GET',
        headers: {
          Authorization: `Api-Key ${apiKey}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Apollo API returned an error: ${response.status} ${response.statusText}`;

      if (response.status === 401) {
        errorMessage = 'Authentication failed. Please check your API key.';
      } else if (response.status === 403) {
        errorMessage =
          'Access forbidden. This endpoint requires a master API key or is not available on free plans.';
      } else if (response.status === 422) {
        errorMessage =
          'Invalid email ID. Please check the email ID and try again.';
      }

      log(`Error: ${errorMessage}`);
      throw new Error(`${errorMessage}${errorText ? ` - ${errorText}` : ''}`);
    }

    const data = await response.json();
    log('Successfully retrieved email statistics');

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error fetching email statistics: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
