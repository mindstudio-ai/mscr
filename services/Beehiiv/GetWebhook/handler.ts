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
  const { publicationId, endpointId, outputVariable } = inputs;

  // Validate required environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!endpointId) {
    throw new Error('Webhook ID is required');
  }

  // Log the start of the operation
  log(`Retrieving webhook ${endpointId} from publication ${publicationId}...`);

  try {
    // Construct the API URL
    const url = `https://api.beehiiv.com/v2/publications/${publicationId}/webhooks/${endpointId}`;

    // Set up request options
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    };

    // Make the API request
    const response = await fetch(url, options);

    // Handle non-successful responses
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to retrieve webhook: ${response.status} ${response.statusText}`;

      try {
        // Try to parse error response as JSON
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          errorMessage += ` - ${errorJson.message}`;
        }
      } catch (e) {
        // If error response isn't JSON, include the raw text
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }

      throw new Error(errorMessage);
    }

    // Parse the response
    const responseData = await response.json();

    // Log success
    log('Successfully retrieved webhook details');

    // Set the output variable with the webhook data
    setOutput(outputVariable, responseData.data);
  } catch (error) {
    // Handle and rethrow errors
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
