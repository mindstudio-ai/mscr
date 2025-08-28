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
  // Extract environment variables for WooCommerce authentication
  const { url, consumerKey, consumerSecret } = process.env;
  
  // Validate environment variables
  if (!url) {
    throw new Error("Missing WooCommerce Store URL in environment variables");
  }
  
  if (!consumerKey || !consumerSecret) {
    throw new Error("Missing WooCommerce API credentials in environment variables");
  }
  
  // Extract and validate required inputs
  const { 
    productId, 
    review, 
    reviewer, 
    reviewerEmail, 
    rating, 
    status, 
    verified, 
    outputVariable 
  } = inputs;
  
  if (!productId) {
    throw new Error("Product ID is required");
  }
  
  if (!review) {
    throw new Error("Review content is required");
  }
  
  if (!reviewer) {
    throw new Error("Reviewer name is required");
  }
  
  if (!reviewerEmail) {
    throw new Error("Reviewer email is required");
  }
  
  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/reviews`;
  
  // Prepare request payload
  const payload = {
    product_id: parseInt(productId, 10),
    review,
    reviewer,
    reviewer_email: reviewerEmail,
  };
  
  // Add optional parameters if provided
  if (rating) {
    payload["rating"] = parseInt(rating, 10);
  }
  
  if (status) {
    payload["status"] = status;
  }
  
  if (verified) {
    payload["verified"] = verified === "true";
  }
  
  // Create authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  log(`Creating product review for product ID: ${productId}`);
  
  try {
    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    // Parse the response
    const data = await response.json();
    
    // Check if the request was successful
    if (!response.ok) {
      const errorMessage = data.message || 'Unknown error occurred';
      throw new Error(`WooCommerce API Error: ${errorMessage}`);
    }
    
    log(`Successfully created review with ID: ${data.id}`);
    
    // Set the output variable with the created review data
    setOutput(outputVariable, data);
    
  } catch (error) {
    // Handle any errors that occurred during the API request
    log(`Error creating product review: ${error.message}`);
    throw error;
  }
};