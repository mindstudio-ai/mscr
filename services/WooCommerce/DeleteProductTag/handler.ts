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
  const { tagId, confirmDeletion, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate environment variables
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required WooCommerce credentials. Please check your connection settings.',
    );
  }

  // Validate inputs
  if (!tagId) {
    throw new Error('Tag ID is required');
  }

  // Check if deletion is confirmed
  if (confirmDeletion !== 'yes') {
    throw new Error(
      'Deletion not confirmed. Please select "Yes" to confirm deletion.',
    );
  }

  // Construct the API URL - ensure no trailing slash in base URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/tags/${tagId}?force=true`;

  // Create basic auth credentials
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Deleting product tag with ID: ${tagId}`);

  try {
    // Make the DELETE request
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else if (response.status === 404) {
        throw new Error(`Product tag with ID ${tagId} not found.`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `Error deleting product tag: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }
    }

    // Parse the response
    const deletedTag = await response.json();

    log(
      `Successfully deleted product tag: ${deletedTag.name} (ID: ${deletedTag.id})`,
    );

    // Set the output
    setOutput(outputVariable, deletedTag);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while deleting the product tag');
  }
};
