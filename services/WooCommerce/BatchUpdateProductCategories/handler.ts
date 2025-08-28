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
  // Get environment variables
  const { url, consumerKey, consumerSecret } = process.env;
  
  // Validate required environment variables
  if (!url) {
    throw new Error("Store URL is required. Please configure your WooCommerce store URL.");
  }
  
  if (!consumerKey || !consumerSecret) {
    throw new Error("WooCommerce API credentials are required. Please configure your Consumer Key and Consumer Secret.");
  }
  
  // Extract inputs
  const { createCategories, updateCategories, deleteCategories, outputVariable } = inputs;
  
  // Validate that at least one operation is provided
  if (!createCategories && !updateCategories && !deleteCategories) {
    throw new Error("At least one operation (create, update, or delete) must be provided.");
  }
  
  // Prepare request body
  const requestBody: Record<string, any> = {};
  
  // Add create categories if provided
  if (createCategories && Array.isArray(createCategories) && createCategories.length > 0) {
    requestBody.create = createCategories;
    log(`Preparing to create ${createCategories.length} categories`);
  }
  
  // Add update categories if provided
  if (updateCategories && Array.isArray(updateCategories) && updateCategories.length > 0) {
    requestBody.update = updateCategories;
    log(`Preparing to update ${updateCategories.length} categories`);
  }
  
  // Process delete categories if provided
  if (deleteCategories) {
    // Convert comma-separated string to array of integers
    const deleteIds = deleteCategories
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));
    
    if (deleteIds.length > 0) {
      requestBody.delete = deleteIds;
      log(`Preparing to delete ${deleteIds.length} categories`);
    }
  }
  
  // Construct API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/categories/batch`;
  
  // Create Basic Auth credentials
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  try {
    log("Sending request to WooCommerce API...");
    
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      },
      body: JSON.stringify(requestBody)
    });
    
    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WooCommerce API error (${response.status}): ${errorText}`);
    }
    
    const result = await response.json();
    
    // Log success message
    const createdCount = result.create?.length || 0;
    const updatedCount = result.update?.length || 0;
    const deletedCount = result.delete?.length || 0;
    
    log(`Successfully processed categories: ${createdCount} created, ${updatedCount} updated, ${deletedCount} deleted`);
    
    // Set output
    setOutput(outputVariable, result);
    
  } catch (error) {
    // Handle errors
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};