export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const { publicationId, endpointId, eventTypes, description, outputVariable } =
    inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!endpointId) {
    throw new Error('Webhook ID is required');
  }

  // Construct request URL
  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/webhooks/${endpointId}`;

  // Prepare request body
  const requestBody: Record<string, any> = {};

  if (eventTypes && Array.isArray(eventTypes)) {
    requestBody.event_types = eventTypes;
  }

  if (description !== undefined) {
    requestBody.description = description;
  }

  log(`Updating webhook ${endpointId} for publication ${publicationId}...`);

  try {
    // Make the PATCH request to update the webhook
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.message || `HTTP error ${response.status}`;
      throw new Error(`Failed to update webhook: ${errorMessage}`);
    }

    // Parse the response
    const responseData = await response.json();

    log(`Webhook updated successfully`);

    // Set the output variable with the webhook data
    setOutput(outputVariable, responseData.data);
  } catch (error) {
    // Handle any errors
    log(
      `Error updating webhook: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
