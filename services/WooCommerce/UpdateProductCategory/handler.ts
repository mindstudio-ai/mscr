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
    throw new Error('Missing Store URL in environment variables');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing API credentials in environment variables');
  }

  // Extract inputs
  const {
    categoryId,
    name,
    slug,
    parent,
    description,
    display,
    menuOrder,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!categoryId) {
    throw new Error('Category ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Construct the API endpoint
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/categories/${categoryId}`;

  // Prepare request body with only the provided fields
  const requestBody: Record<string, any> = {};

  if (name !== undefined) {
    requestBody.name = name;
  }
  if (slug !== undefined) {
    requestBody.slug = slug;
  }
  if (parent !== undefined) {
    requestBody.parent = parseInt(parent, 10);
  }
  if (description !== undefined) {
    requestBody.description = description;
  }
  if (display !== undefined) {
    requestBody.display = display;
  }
  if (menuOrder !== undefined) {
    requestBody.menu_order = parseInt(menuOrder, 10);
  }

  // Log the operation
  log(`Updating product category with ID: ${categoryId}`);

  try {
    // Create authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update category: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const updatedCategory = await response.json();

    // Log success
    log(
      `Successfully updated category: ${updatedCategory.name} (ID: ${updatedCategory.id})`,
    );

    // Set output
    setOutput(outputVariable, updatedCategory);
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
