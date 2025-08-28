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
    throw new Error(
      'Missing required environment variables: url, consumerKey, or consumerSecret',
    );
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url,
    consumerKey,
    consumerSecret,
    version: 'wc/v3',
    queryStringAuth: true, // Force Basic Authentication as query string for some servers
  });

  log('Connecting to WooCommerce store...');

  // Extract inputs
  const {
    search,
    category,
    tag,
    sku,
    type,
    stockStatus,
    featured,
    onSale,
    orderby,
    order,
    perPage,
    page,
    outputVariable,
  } = inputs;

  // Build query parameters
  const params: Record<string, any> = {};

  // Add filtering parameters if provided
  if (search) {
    params.search = search;
  }
  if (category) {
    params.category = category;
  }
  if (tag) {
    params.tag = tag;
  }
  if (sku) {
    params.sku = sku;
  }
  if (type) {
    params.type = type;
  }
  if (stockStatus) {
    params.stock_status = stockStatus;
  }
  if (featured) {
    params.featured = featured === 'true';
  }
  if (onSale) {
    params.on_sale = onSale === 'true';
  }

  // Add sorting parameters
  if (orderby) {
    params.orderby = orderby;
  }
  if (order) {
    params.order = order;
  }

  // Add pagination parameters
  if (perPage) {
    params.per_page = parseInt(perPage, 10);
  }
  if (page) {
    params.page = parseInt(page, 10);
  }

  log(`Fetching products with the specified filters...`);

  try {
    // Make API request to fetch products
    const response = await api.get('products', { params });

    // Get the products from the response
    const products = response.data;

    log(`Successfully retrieved ${products.length} products`);

    // Set the output variable with the products data
    setOutput(outputVariable, products);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Unknown error';

      log(`Error ${statusCode}: ${errorMessage}`);
      throw new Error(`WooCommerce API error (${statusCode}): ${errorMessage}`);
    } else if (error.request) {
      // The request was made but no response was received
      log('No response received from WooCommerce API');
      throw new Error(
        'No response received from WooCommerce API. Please check your store URL and internet connection.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      log(`Error: ${error.message}`);
      throw error;
    }
  }
};
