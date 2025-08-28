export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
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
  const { orderId, noteType, outputVariable } = inputs;

  // Validate required inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  // Construct the base URL, ensuring no trailing slash
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Build the API endpoint
  let apiUrl = `${baseUrl}/wp-json/wc/v3/orders/${orderId}/notes`;

  // Add query parameters if needed
  const queryParams = new URLSearchParams();
  if (noteType) {
    queryParams.append('type', noteType);
  }

  // Append query parameters to URL if any exist
  const queryString = queryParams.toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  log(
    `Retrieving notes for order #${orderId}${noteType !== 'any' ? ` (type: ${noteType})` : ''}`,
  );

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
    const notes = await response.json();

    // Validate that we received an array
    if (!Array.isArray(notes)) {
      throw new Error('Unexpected response format: expected an array of notes');
    }

    log(
      `Successfully retrieved ${notes.length} note${notes.length === 1 ? '' : 's'} for order #${orderId}`,
    );

    // Set the output variable with the notes
    setOutput(outputVariable, notes);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error retrieving order notes: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
