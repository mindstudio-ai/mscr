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
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error("Missing required environment variables: url, consumerKey, or consumerSecret");
  }

  // Extract inputs
  const { createReviews, updateReviews, deleteReviews, outputVariable } = inputs;
  
  // Validate that at least one operation is provided
  if (!createReviews && !updateReviews && !deleteReviews) {
    throw new Error("At least one operation (create, update, or delete) must be provided");
  }

  // Prepare request body
  const requestBody: {
    create?: any[];
    update?: any[];
    delete?: number[];
  } = {};

  // Add create reviews if provided
  if (createReviews && Array.isArray(createReviews) && createReviews.length > 0) {
    requestBody.create = createReviews;
    log(`Preparing to create ${createReviews.length} product review(s)`);
  }

  // Add update reviews if provided
  if (updateReviews && Array.isArray(updateReviews) && updateReviews.length > 0) {
    requestBody.update = updateReviews;
    log(`Preparing to update ${updateReviews.length} product review(s)`);
  }

  // Add delete reviews if provided
  if (deleteReviews) {
    // Handle either array input or comma-separated string
    let deleteIds: number[] = [];
    
    if (Array.isArray(deleteReviews)) {
      deleteIds = deleteReviews.map(id => Number(id));
    } else if (typeof deleteReviews === 'string') {
      deleteIds = deleteReviews.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id));
    }
    
    if (deleteIds.length > 0) {
      requestBody.delete = deleteIds;
      log(`Preparing to delete ${deleteIds.length} product review(s)`);
    }
  }

  // Create authorization header using Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  try {
    // Make the API request
    log("Sending batch update request to WooCommerce...");
    
    const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/reviews/batch`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WooCommerce API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const result = await response.json();
    
    // Log the results
    let summary = [];
    if (result.create && result.create.length > 0) {
      summary.push(`Created ${result.create.length} review(s)`);
    }
    if (result.update && result.update.length > 0) {
      summary.push(`Updated ${result.update.length} review(s)`);
    }
    if (result.delete && result.delete.length > 0) {
      summary.push(`Deleted ${result.delete.length} review(s)`);
    }
    
    log(`Batch operation completed successfully: ${summary.join(', ')}`);
    
    // Set the output variable
    setOutput(outputVariable, result);
    
  } catch (error) {
    // Handle any errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMessage}`);
    throw error;
  }
};