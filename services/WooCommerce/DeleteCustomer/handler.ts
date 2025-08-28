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
  const { customerId, forceDelete, reassignPosts, outputVariable } = inputs;

  // Validate required inputs
  if (!customerId) {
    throw new Error('Customer ID is required');
  }

  // Create the authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  // Build the API URL
  let apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/customers/${customerId}?force=${forceDelete}`;

  // Add reassign parameter if provided
  if (reassignPosts) {
    apiUrl += `&reassign=${reassignPosts}`;
  }

  log(`Preparing to delete customer with ID: ${customerId}`);

  try {
    // Make the DELETE request to the WooCommerce API
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Parse the response
    const data = await response.json();

    // Check for errors in the response
    if (!response.ok) {
      if (data.message) {
        throw new Error(`WooCommerce API Error: ${data.message}`);
      } else {
        throw new Error(
          `WooCommerce API Error: ${response.status} ${response.statusText}`,
        );
      }
    }

    log(
      `Successfully deleted customer: ${data.first_name || ''} ${data.last_name || ''} (ID: ${data.id})`,
    );

    // Set the output variable with the deleted customer data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    log(`Error deleting customer: ${error.message}`);
    throw error;
  }
};
