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
      'Missing API Key. Please configure the HeyReach API Key in your environment variables.',
    );
  }

  // Extract input parameters
  const { senderAccountId, leadProfileUrl, leadLinkedInId, outputVariable } =
    inputs;

  // Validate required parameters
  if (!senderAccountId) {
    throw new Error('Sender Account ID is required');
  }

  // Validate that either leadProfileUrl OR leadLinkedInId is provided, but not both
  if (!leadProfileUrl && !leadLinkedInId) {
    throw new Error(
      'Either Lead Profile URL or Lead LinkedIn ID must be provided',
    );
  }

  if (leadProfileUrl && leadLinkedInId) {
    throw new Error(
      'Only one of Lead Profile URL or Lead LinkedIn ID should be provided, not both',
    );
  }

  // Prepare request body
  const requestBody = {
    senderAccountId: Number(senderAccountId),
    leadProfileUrl: leadProfileUrl || null,
    leadLinkedInId: leadLinkedInId || null,
  };

  log(`Checking connection status for ${leadProfileUrl || leadLinkedInId}`);

  try {
    // Make API request to HeyReach
    const response = await fetch(
      'https://api.heyreach.io/api/public/MyNetwork/IsConnection',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const data = await response.json();

    log(`Connection check completed successfully`);

    // Set the output variable with the connection status
    setOutput(outputVariable, data.isConnection);
  } catch (error) {
    log(
      `Error checking connection status: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
