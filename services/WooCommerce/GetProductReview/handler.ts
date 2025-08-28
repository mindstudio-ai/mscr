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
    throw new Error('Missing WooCommerce store URL. Please check your connection settings.');
  }
  
  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing WooCommerce API credentials. Please check your connection settings.');
  }
  
  // Extract inputs
  const { reviewId, outputVariable } = inputs;
  
  if (!reviewId) {
    throw new Error('Review ID is required');
  }
  
  // Remove trailing slash from URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  
  // Construct the API URL
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/reviews/${reviewId}`;
  
  log(`Retrieving product review with ID: ${reviewId}`);
  
  try {
    // Create authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
    });
    
    // Check if the request was successful
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Product review with ID ${reviewId} not found`);
      }
      
      const errorText = await response.text();
      throw new Error(`WooCommerce API error (${response.status}): ${errorText}`);
    }
    
    // Parse the response
    const reviewData = await response.json();
    
    log(`Successfully retrieved review by ${reviewData.reviewer}`);
    
    // Set the output variable with the review data
    setOutput(outputVariable, reviewData);
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve product review: ${error.message}`);
    }
    throw new Error('An unknown error occurred while retrieving the product review');
  }
};