import axios from 'axios';

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

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Missing Store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret in the connector settings.',
    );
  }

  // Extract inputs
  const {
    categoriesToCreate,
    categoriesToUpdate,
    categoriesToDelete,
    outputVariable,
  } = inputs;

  // Prepare request payload
  const payload: {
    create?: any[];
    update?: any[];
    delete?: number[];
  } = {};

  // Process create categories if provided
  if (
    categoriesToCreate &&
    Array.isArray(categoriesToCreate) &&
    categoriesToCreate.length > 0
  ) {
    payload.create = categoriesToCreate;
    log(`Preparing to create ${categoriesToCreate.length} categories`);
  }

  // Process update categories if provided
  if (
    categoriesToUpdate &&
    Array.isArray(categoriesToUpdate) &&
    categoriesToUpdate.length > 0
  ) {
    payload.update = categoriesToUpdate;
    log(`Preparing to update ${categoriesToUpdate.length} categories`);
  }

  // Process delete categories if provided
  if (categoriesToDelete) {
    // Convert comma-separated string to array of numbers
    const deleteIds = categoriesToDelete
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '')
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));

    if (deleteIds.length > 0) {
      payload.delete = deleteIds;
      log(`Preparing to delete ${deleteIds.length} categories`);
    }
  }

  // Validate that at least one operation is requested
  if (Object.keys(payload).length === 0) {
    throw new Error(
      'No operations specified. Please provide at least one category to create, update, or delete.',
    );
  }

  try {
    // Construct the API endpoint URL
    const endpoint = `${url}/wp-json/wc/v3/products/categories/batch`;

    log('Sending batch request to WooCommerce API...');

    // Make the API request
    const response = await axios.post(endpoint, payload, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Process the response
    const result = response.data;

    // Log operation results
    if (result.create && result.create.length > 0) {
      log(`Successfully created ${result.create.length} categories`);
    }

    if (result.update && result.update.length > 0) {
      log(`Successfully updated ${result.update.length} categories`);
    }

    if (result.delete && result.delete.length > 0) {
      log(`Successfully deleted ${result.delete.length} categories`);
    }

    // Set the output variable with the complete result
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle API errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorData = error.response.data;
      const errorMessage = errorData.message || 'Unknown API error';
      throw new Error(`WooCommerce API Error: ${errorMessage}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from WooCommerce API. Please check your store URL and internet connection.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
};
