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
  // Extract inputs
  const { orderId, refundId, outputVariable } = inputs;

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
      'WooCommerce API credentials are required. Please check your connection settings.',
    );
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(`Deleting refund #${refundId} from order #${orderId}...`);

    // Make the API request to delete the refund
    // force=true is required as refunds don't support trashing
    const response = await api.delete(`orders/${orderId}/refunds/${refundId}`, {
      force: true,
    });

    // Extract the deleted refund data
    const deletedRefund = response.data;

    log(`Successfully deleted refund #${refundId} from order #${orderId}`);

    // Set the output variable with the deleted refund data
    setOutput(outputVariable, deletedRefund);
  } catch (error) {
    // Handle API errors
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 || status === 403) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else if (status === 404) {
        throw new Error(`Refund #${refundId} or order #${orderId} not found.`);
      } else {
        throw new Error(
          `WooCommerce API error: ${data.message || JSON.stringify(data)}`,
        );
      }
    } else {
      // Handle network or other errors
      throw new Error(`Error deleting refund: ${error.message}`);
    }
  }
};
