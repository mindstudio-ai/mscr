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
  // Extract inputs
  const { profileUrl, outputVariable } = inputs;
  const { apiKey } = process.env;

  // Validate required inputs
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API key in the service settings.',
    );
  }

  if (!profileUrl) {
    throw new Error('LinkedIn Profile URL is required.');
  }

  log(`Retrieving lead information for profile: ${profileUrl}`);

  try {
    // Make request to HeyReach API
    const response = await fetch(
      'https://api.heyreach.io/api/public/lead/GetLead',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify({
          profileUrl,
        }),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const leadData = await response.json();

    log('Successfully retrieved lead information');

    // Set the output variable with the lead data
    setOutput(outputVariable, leadData);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error retrieving lead information: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while retrieving lead information');
  }
};
