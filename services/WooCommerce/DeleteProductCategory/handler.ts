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
  const { categoryId, force, outputVariable } = inputs;
  
  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;
  
  // Validate required environment variables
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error('Missing required WooCommerce credentials. Please check your store URL, consumer key, and consumer secret.');
  }
  
  // Validate required inputs
  if (!categoryId) {
    throw new Error('Category ID is required');
  }
  
  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3'
  });
  
  try {
    log(`Deleting product category with ID: ${categoryId}...`);
    
    // Make the delete request to WooCommerce API
    // Force parameter must be true for categories as they don't support trash
    const response = await api.delete(`products/categories/${categoryId}`, {
      force: true
    });
    
    // Get the deleted category data from the response
    const deletedCategory = response.data;
    
    log(`Successfully deleted category: ${deletedCategory.name} (ID: ${deletedCategory.id})`);
    
    // Set the output variable with the deleted category data
    setOutput(outputVariable, deletedCategory);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Unknown error occurred';
      
      if (statusCode === 404) {
        throw new Error(`Category with ID ${categoryId} not found. Please check the category ID and try again.`);
      } else if (statusCode === 401 || statusCode === 403) {
        throw new Error('Authentication failed. Please check your WooCommerce API credentials.');
      } else {
        throw new Error(`WooCommerce API error (${statusCode}): ${errorMessage}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from WooCommerce. Please check your store URL and internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error: ${error.message}`);
    }
  }
};