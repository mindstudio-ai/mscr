import fetch from 'node-fetch';

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
  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate environment variables
  if (!url) {
    throw new Error('Missing Store URL in environment variables');
  }
  if (!consumerKey) {
    throw new Error('Missing Consumer Key in environment variables');
  }
  if (!consumerSecret) {
    throw new Error('Missing Consumer Secret in environment variables');
  }

  // Extract inputs
  const { zoneId, outputVariable } = inputs;

  // Validate required inputs
  if (!zoneId) {
    throw new Error('Zone ID is required');
  }

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API URL
  const apiUrl = `${baseUrl}/wp-json/wc/v3/shipping/zones/${zoneId}`;

  log(`Retrieving shipping zone with ID: ${zoneId}`);

  try {
    // Create authorization header for Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
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
    const data = await response.json();

    log(`Successfully retrieved shipping zone: ${data.name}`);

    // Set the output variable with the shipping zone data
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error retrieving shipping zone: ${error.message}`);
    throw error;
  }
};
