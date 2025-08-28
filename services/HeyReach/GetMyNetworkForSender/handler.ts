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
      'Missing API Key. Please configure the HeyReach API key in the service settings.',
    );
  }

  // Extract inputs
  const { senderId, pageNumber, pageSize, outputVariable } = inputs;

  // Validate required inputs
  if (!senderId) {
    throw new Error('Sender ID is required');
  }

  // Prepare request body
  const requestBody = {
    senderId: parseInt(senderId, 10),
    pageNumber: parseInt(pageNumber, 10) || 0,
    pageSize: parseInt(pageSize, 10) || 100,
  };

  log(`Retrieving network connections for sender ID: ${senderId}`);
  log(`Page ${pageNumber}, with ${pageSize} results per page`);

  try {
    // Make request to HeyReach API
    const response = await fetch(
      'https://api.heyreach.io/api/public/MyNetwork/GetMyNetworkForSender',
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

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(
      `Successfully retrieved ${data.items.length} network connections (total count: ${data.totalCount})`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error retrieving network connections: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
