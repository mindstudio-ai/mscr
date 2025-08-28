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
  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate environment variables
  if (!url) {
    throw new Error('Missing Store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error('Missing API Consumer Key in environment variables');
  }
  if (!consumerSecret) {
    throw new Error('Missing API Consumer Secret in environment variables');
  }

  // Extract inputs
  const { groupId, outputVariable } = inputs;

  // Validate inputs
  if (!groupId) {
    throw new Error('Settings Group ID is required');
  }

  // Create base64 encoded auth string for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  // Construct the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/settings/${groupId}`;

  log(`Retrieving settings for group: ${groupId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const settings = await response.json();

    // Validate the response format
    if (!Array.isArray(settings)) {
      throw new Error(
        'Unexpected response format: settings should be an array',
      );
    }

    log(
      `Successfully retrieved ${settings.length} settings from the ${groupId} group`,
    );

    // Set the output variable
    setOutput(outputVariable, settings);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error retrieving settings: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
