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
    throw new Error('Missing WooCommerce store URL');
  }
  if (!consumerKey) {
    throw new Error('Missing WooCommerce API Consumer Key');
  }
  if (!consumerSecret) {
    throw new Error('Missing WooCommerce API Consumer Secret');
  }

  // Extract inputs
  const { name, slug, description, outputVariable } = inputs;
  
  // Validate required inputs
  if (!name) {
    throw new Error('Tag name is required');
  }

  // Prepare request body
  const requestBody: Record<string, string> = {
    name,
  };

  // Add optional fields if provided
  if (slug) {
    requestBody.slug = slug;
  }
  if (description) {
    requestBody.description = description;
  }

  // Prepare API endpoint
  const endpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/tags`;
  
  // Create authorization header (Basic Auth)
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  log(`Creating product tag "${name}" in WooCommerce...`);

  try {
    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const data = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage = data.message || 'Unknown error occurred';
      throw new Error(`WooCommerce API error: ${errorMessage}`);
    }

    log(`Successfully created product tag "${name}" with ID ${data.id}`);
    
    // Set the output variable with the complete tag data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error creating product tag: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while creating product tag');
  }
};