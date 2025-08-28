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
  
  // Validate required environment variables
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error('Missing required WooCommerce credentials. Please check your store URL, consumer key, and consumer secret.');
  }

  // Extract inputs
  const { 
    productIds, 
    status, 
    order, 
    orderby, 
    perPage, 
    page, 
    search, 
    outputVariable 
  } = inputs;

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3'
  });

  log('Connecting to WooCommerce store...');

  // Prepare query parameters
  const queryParams: Record<string, any> = {};
  
  // Add parameters only if they are defined
  if (status) queryParams.status = status;
  if (order) queryParams.order = order;
  if (orderby) queryParams.orderby = orderby;
  if (perPage) queryParams.per_page = parseInt(perPage, 10);
  if (page) queryParams.page = parseInt(page, 10);
  if (search) queryParams.search = search;
  
  // Handle product IDs if provided (convert comma-separated string to array)
  if (productIds && productIds.trim() !== '') {
    const productIdsArray = productIds.split(',').map(id => parseInt(id.trim(), 10));
    queryParams.product = productIdsArray;
  }

  try {
    log('Fetching product reviews...');
    
    // Make the API request
    const response = await api.get('products/reviews', queryParams);
    
    const reviews = response.data;
    const totalReviews = Array.isArray(reviews) ? reviews.length : 0;
    
    log(`Successfully retrieved ${totalReviews} product reviews.`);
    
    // Set the output variable
    setOutput(outputVariable, reviews);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Unknown error';
      
      throw new Error(`WooCommerce API error (${statusCode}): ${errorMessage}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from WooCommerce. Please check your store URL and internet connection.');
    } else {
      // Something happened in setting up the request
      throw new Error(`Error connecting to WooCommerce: ${error.message}`);
    }
  }
};