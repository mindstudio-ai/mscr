export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs and environment variables
  const { baseId, outputVariable } = inputs;
  const token = process.env.token;

  // Validate required inputs and environment variables
  if (!token) {
    throw new Error(
      'Missing Airtable API token. Please check your connection settings.',
    );
  }

  if (!baseId) {
    throw new Error(
      'Base ID is required. Please provide a valid Airtable base ID.',
    );
  }

  // Log the start of the operation
  log(`Fetching webhooks for Airtable base: ${baseId}`);

  try {
    // Make the API request to list webhooks
    const response = await fetch(
      `https://api.airtable.com/v0/bases/${baseId}/webhooks`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      log(`Error fetching webhooks: ${response.status} ${response.statusText}`);

      // Provide more specific error messages based on status codes
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your Airtable API token.',
        );
      } else if (response.status === 404) {
        throw new Error(
          `Base with ID '${baseId}' not found. Please check your Base ID.`,
        );
      } else {
        throw new Error(
          `Airtable API error (${response.status}): ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    // Log success and some basic info about the results
    const webhookCount = data.webhooks ? data.webhooks.length : 0;
    log(
      `Successfully retrieved ${webhookCount} webhook${webhookCount === 1 ? '' : 's'}`,
    );

    // Set the output variable with the list of webhooks
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
