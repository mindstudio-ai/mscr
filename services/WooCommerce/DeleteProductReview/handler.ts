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
  
  // Validate environment variables
  if (!url) {
    throw new Error("Missing WooCommerce store URL. Please check your connection settings.");
  }
  
  if (!consumerKey || !consumerSecret) {
    throw new Error("Missing WooCommerce API credentials. Please check your connection settings.");
  }
  
  // Extract inputs
  const { reviewId, outputVariable } = inputs;
  
  if (!reviewId) {
    throw new Error("Review ID is required");
  }
  
  // Create the authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  // Construct the API URL
  // Force parameter is required as WooCommerce doesn't support trashing for reviews
  const apiUrl = `${url}/wp-json/wc/v3/products/reviews/${reviewId}?force=true`;
  
  log(`Deleting product review with ID: ${reviewId}`);
  
  try {
    // Make the DELETE request to the WooCommerce API
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Parse the response
    const data = await response.json();
    
    // Check if the request was successful
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Review with ID ${reviewId} not found`);
      } else {
        throw new Error(`Failed to delete review: ${data.message || response.statusText}`);
      }
    }
    
    log(`Successfully deleted product review with ID: ${reviewId}`);
    
    // Set the output variable with the deletion result
    setOutput(outputVariable, data);
    
  } catch (error) {
    // Handle any errors that occurred during the request
    log(`Error deleting product review: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};