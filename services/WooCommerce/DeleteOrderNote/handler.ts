import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

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
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required environment variables: url, consumerKey, or consumerSecret',
    );
  }

  // Extract inputs
  const { orderId, noteId, force, outputVariable } = inputs;

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(`Deleting note ${noteId} from order ${orderId}...`);

    // Make the API request to delete the order note
    const response = await api.delete(`orders/${orderId}/notes/${noteId}`, {
      force: force === 'true',
    });

    // Extract the deleted note data from the response
    const deletedNote = response.data;

    log(`Successfully deleted note ${noteId} from order ${orderId}`);

    // Set the output variable with the deleted note data
    setOutput(outputVariable, deletedNote);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;

      if (status === 401 || status === 403) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else if (status === 404) {
        throw new Error(
          `Resource not found. Please verify that order ID ${orderId} and note ID ${noteId} exist.`,
        );
      } else {
        throw new Error(
          `WooCommerce API error (${status}): ${data.message || JSON.stringify(data)}`,
        );
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from WooCommerce. Please check your store URL and internet connection.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error: ${error.message}`);
    }
  }
};
