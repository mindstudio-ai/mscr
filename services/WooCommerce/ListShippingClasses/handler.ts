export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;
  
  // Validate required environment variables
  if (!url) {
    throw new Error("Missing Store URL. Please configure your WooCommerce store URL in the connector settings.");
  }
  
  if (!consumerKey || !consumerSecret) {
    throw new Error("Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret in the connector settings.");
  }
  
  // Extract input parameters
  const { 
    perPage = "10", 
    page = "1", 
    order = "asc", 
    orderby = "name", 
    search = "",
    outputVariable 
  } = inputs;
  
  if (!outputVariable) {
    throw new Error("Missing output variable name. Please specify a variable name to store the results.");
  }
  
  // Build query parameters
  const queryParams = new URLSearchParams();
  if (perPage) queryParams.append("per_page", perPage);
  if (page) queryParams.append("page", page);
  if (order) queryParams.append("order", order);
  if (orderby) queryParams.append("orderby", orderby);
  if (search) queryParams.append("search", search);
  
  // Construct API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/shipping_classes?${queryParams.toString()}`;
  
  // Create authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  log(`Fetching shipping classes from your WooCommerce store...`);
  
  try {
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WooCommerce API error (${response.status}): ${errorText}`);
    }
    
    const shippingClasses = await response.json();
    
    if (!Array.isArray(shippingClasses)) {
      throw new Error("Unexpected response format. Expected an array of shipping classes.");
    }
    
    log(`Successfully retrieved ${shippingClasses.length} shipping classes.`);
    
    // Set the output to the specified variable
    setOutput(outputVariable, shippingClasses);
    
  } catch (error) {
    log(`Error fetching shipping classes: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};