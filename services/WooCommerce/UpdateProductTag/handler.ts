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

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Store URL is required. Please check your WooCommerce connection settings.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'API credentials are required. Please check your WooCommerce connection settings.',
    );
  }

  // Extract inputs
  const { tagId, name, slug, description, outputVariable } = inputs;

  // Validate required inputs
  if (!tagId) {
    throw new Error('Tag ID is required.');
  }

  // Create request body with only provided fields
  const requestBody: Record<string, string> = {};
  if (name !== undefined) {
    requestBody.name = name;
  }
  if (slug !== undefined) {
    requestBody.slug = slug;
  }
  if (description !== undefined) {
    requestBody.description = description;
  }

  // Check if there are any fields to update
  if (Object.keys(requestBody).length === 0) {
    log(
      'No fields provided for update. Please specify at least one field to update.',
    );
    throw new Error(
      'No fields provided for update. Please specify at least one field to update.',
    );
  }

  // Construct API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/tags/${tagId}`;

  // Create Basic Auth credentials
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log(`Updating product tag with ID: ${tagId}...`);

    // Make API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 404) {
        throw new Error(`Tag with ID ${tagId} not found.`);
      } else if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else {
        throw new Error(
          `Failed to update tag: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }
    }

    // Parse response
    const updatedTag = await response.json();

    log(`Successfully updated product tag: ${updatedTag.name}`);

    // Set output
    setOutput(outputVariable, updatedTag);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while updating the product tag.',
    );
  }
};
