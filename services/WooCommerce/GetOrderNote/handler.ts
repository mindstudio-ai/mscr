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
    throw new Error(
      'Missing WooCommerce Store URL. Please check your connection settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { orderId, noteId, outputVariable } = inputs;

  // Validate inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  if (!noteId) {
    throw new Error('Note ID is required');
  }

  // Remove trailing slash from URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint URL
  const apiUrl = `${baseUrl}/wp-json/wc/v3/orders/${orderId}/notes/${noteId}`;

  // Create authorization header using Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Retrieving note ${noteId} from order ${orderId}...`);

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
        `Failed to retrieve order note: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const orderNote = await response.json();

    log(
      `Successfully retrieved note: "${orderNote.note.substring(0, 50)}${orderNote.note.length > 50 ? '...' : ''}"`,
    );

    // Set the output variable with the order note data
    setOutput(outputVariable, orderNote);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(`Error retrieving order note: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred while retrieving order note`);
    }
  }
};
