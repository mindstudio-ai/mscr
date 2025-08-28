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
    throw new Error('Missing Consumer Key in environment variables');
  }
  if (!consumerSecret) {
    throw new Error('Missing Consumer Secret in environment variables');
  }

  // Extract inputs
  const { attributeId, force, outputVariable } = inputs;

  // Validate required inputs
  if (!attributeId) {
    throw new Error('Attribute ID is required');
  }

  // Prepare the API endpoint
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/attributes/${attributeId}`;

  // Add query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('force', force);
  const fullUrl = `${endpoint}?${queryParams.toString()}`;

  // Prepare authentication
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Deleting product attribute with ID: ${attributeId}`);

  try {
    // Make the DELETE request
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete product attribute: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const deletedAttribute = await response.json();

    log(
      `Successfully deleted product attribute: ${deletedAttribute.name} (ID: ${deletedAttribute.id})`,
    );

    // Set the output
    setOutput(outputVariable, deletedAttribute);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while deleting the product attribute',
    );
  }
};
