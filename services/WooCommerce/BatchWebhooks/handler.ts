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

  // Validate required environment variables
  if (!url) {
    throw new Error('Missing Store URL in environment variables');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing API credentials in environment variables');
  }

  // Extract inputs
  const { createWebhooks, updateWebhooks, deleteWebhooks, outputVariable } =
    inputs;

  // Validate that at least one operation is specified
  if (!createWebhooks && !updateWebhooks && !deleteWebhooks) {
    throw new Error(
      'At least one operation (create, update, or delete) must be specified',
    );
  }

  // Prepare request body
  const requestBody: Record<string, any> = {};

  // Add create webhooks if provided
  if (createWebhooks) {
    requestBody.create = createWebhooks;
    log(`Preparing to create ${createWebhooks.length} webhook(s)`);
  }

  // Add update webhooks if provided
  if (updateWebhooks) {
    requestBody.update = updateWebhooks;
    log(`Preparing to update ${updateWebhooks.length} webhook(s)`);
  }

  // Process delete webhooks if provided
  if (deleteWebhooks) {
    // Convert comma-separated string to array of integers
    const deleteIds = deleteWebhooks
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10))
      .filter((id: number) => !isNaN(id));

    if (deleteIds.length > 0) {
      requestBody.delete = deleteIds;
      log(`Preparing to delete ${deleteIds.length} webhook(s)`);
    }
  }

  // Construct API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/webhooks/batch`;

  // Create authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log('Sending batch webhook request to WooCommerce...');

  try {
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const result = await response.json();

    // Log the results
    let summary = [];

    if (result.create && result.create.length > 0) {
      summary.push(`Created ${result.create.length} webhook(s)`);
    }

    if (result.update && result.update.length > 0) {
      summary.push(`Updated ${result.update.length} webhook(s)`);
    }

    if (result.delete && result.delete.length > 0) {
      summary.push(`Deleted ${result.delete.length} webhook(s)`);
    }

    log(`Batch operation completed successfully: ${summary.join(', ')}`);

    // Set the output variable
    setOutput(outputVariable, result);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
