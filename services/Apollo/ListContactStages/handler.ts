export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey } = process.env;
  const { outputVariable } = inputs;

  // Validate API key
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please check your connection settings.',
    );
  }

  log('Fetching contact stages from Apollo...');

  try {
    // Make request to Apollo API
    const response = await fetch(
      'https://api.apollo.io/api/v1/contact_stages',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Apollo API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const data = await response.json();

    // Check if contact_stages exists in the response
    if (!data.contact_stages) {
      throw new Error(
        'Unexpected API response: contact_stages not found in response',
      );
    }

    log(`Successfully retrieved ${data.contact_stages.length} contact stages`);

    // Set the output variable with the contact stages
    setOutput(outputVariable, data.contact_stages);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error fetching contact stages: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while fetching contact stages');
  }
};
