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
    throw new Error(
      'Missing required environment variables: url, consumerKey, or consumerSecret',
    );
  }

  // Extract inputs
  const {
    attributeId,
    createTerms = [],
    updateTerms = [],
    deleteTerms,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!attributeId) {
    throw new Error('Attribute ID is required');
  }

  // Process delete terms (convert comma-separated string to array of integers)
  let deleteTermsArray: number[] = [];
  if (deleteTerms) {
    deleteTermsArray = deleteTerms
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10));
  }

  // Construct request payload
  const payload: {
    create?: any[];
    update?: any[];
    delete?: number[];
  } = {};

  // Only include non-empty arrays in the payload
  if (createTerms && createTerms.length > 0) {
    payload.create = createTerms;
  }

  if (updateTerms && updateTerms.length > 0) {
    payload.update = updateTerms;
  }

  if (deleteTermsArray.length > 0) {
    payload.delete = deleteTermsArray;
  }

  // Log operation details
  log(
    `Performing batch operations on attribute terms for attribute ID: ${attributeId}`,
  );
  if (payload.create) {
    log(`Creating ${payload.create.length} new terms`);
  }
  if (payload.update) {
    log(`Updating ${payload.update.length} existing terms`);
  }
  if (payload.delete) {
    log(`Deleting ${payload.delete.length} terms`);
  }

  try {
    // Construct API endpoint URL
    const apiUrl = `${url}/wp-json/wc/v3/products/attributes/${attributeId}/terms/batch`;

    // Create authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse and process response
    const result = await response.json();

    // Log results
    if (result.create) {
      log(`Successfully created ${result.create.length} terms`);
    }
    if (result.update) {
      log(`Successfully updated ${result.update.length} terms`);
    }
    if (result.delete) {
      log(`Successfully deleted ${result.delete.length} terms`);
    }

    // Set output variable
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};
