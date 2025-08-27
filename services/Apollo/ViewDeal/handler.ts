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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Apollo API key in the connector settings.',
    );
  }

  const { opportunityId, outputVariable } = inputs;
  if (!opportunityId) {
    throw new Error('Missing Deal ID. Please provide a valid Deal ID.');
  }

  log(`Retrieving deal information for ID: ${opportunityId}`);

  try {
    const response = await fetch(
      `https://api.apollo.io/api/v1/opportunities/${opportunityId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Handle different error status codes
    if (!response.ok) {
      const status = response.status;

      if (status === 401) {
        throw new Error('Unauthorized: Invalid API key.');
      } else if (status === 403) {
        throw new Error(
          'Forbidden: This endpoint requires a master API key. Please check your API key permissions.',
        );
      } else if (status === 404) {
        throw new Error(`Deal with ID ${opportunityId} not found.`);
      } else if (status === 422) {
        throw new Error(
          'Unprocessable Entity: The request contains invalid parameters.',
        );
      } else if (status === 429) {
        throw new Error(
          'Too Many Requests: You have exceeded the rate limit. Please try again later.',
        );
      } else {
        throw new Error(`Apollo API returned an error: ${status}`);
      }
    }

    const data = await response.json();

    if (!data.opportunity) {
      throw new Error('No deal information found in the response.');
    }

    log('Successfully retrieved deal information');

    // Set the output variable with the complete opportunity details
    setOutput(outputVariable, data.opportunity);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving deal information.',
    );
  }
};
