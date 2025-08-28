import fetch from 'node-fetch';

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

  // Validate environment variables
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required environment variables: url, consumerKey, or consumerSecret',
    );
  }

  // Extract inputs
  const {
    operationType,
    createTaxRates,
    updateTaxRates,
    deleteTaxRateIds,
    outputVariable,
  } = inputs;

  // Prepare the request payload based on operation type
  const payload: Record<string, any> = {};

  if (operationType === 'create' || operationType === 'mixed') {
    if (!createTaxRates || !Array.isArray(createTaxRates)) {
      throw new Error('Tax rates to create must be provided as an array');
    }
    payload.create = createTaxRates;
    log(`Preparing to create ${createTaxRates.length} tax rates`);
  }

  if (operationType === 'update' || operationType === 'mixed') {
    if (!updateTaxRates || !Array.isArray(updateTaxRates)) {
      throw new Error('Tax rates to update must be provided as an array');
    }

    // Validate that each tax rate has an ID
    updateTaxRates.forEach((taxRate) => {
      if (!taxRate.id) {
        throw new Error('Each tax rate to update must include an id');
      }
    });

    payload.update = updateTaxRates;
    log(`Preparing to update ${updateTaxRates.length} tax rates`);
  }

  if (operationType === 'delete' || operationType === 'mixed') {
    if (!deleteTaxRateIds) {
      throw new Error('Tax rate IDs to delete must be provided');
    }

    // Parse comma-separated IDs into an array of numbers
    let deleteIds: number[];
    if (typeof deleteTaxRateIds === 'string') {
      deleteIds = deleteTaxRateIds
        .split(',')
        .map((id) => parseInt(id.trim(), 10));
    } else if (Array.isArray(deleteTaxRateIds)) {
      deleteIds = deleteTaxRateIds.map((id) =>
        typeof id === 'string' ? parseInt(id.trim(), 10) : id,
      );
    } else {
      throw new Error(
        'Tax rate IDs to delete must be provided as a comma-separated string or an array',
      );
    }

    // Filter out any NaN values
    deleteIds = deleteIds.filter((id) => !isNaN(id));

    if (deleteIds.length === 0) {
      throw new Error('No valid tax rate IDs provided for deletion');
    }

    payload.delete = deleteIds;
    log(`Preparing to delete ${deleteIds.length} tax rates`);
  }

  // Ensure at least one operation is included
  if (Object.keys(payload).length === 0) {
    throw new Error('No valid operations specified');
  }

  // Construct the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/taxes/batch`;

  // Create the authorization header using Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log('Sending request to WooCommerce API...');

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Parse the response
    const data = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage = data.message || 'Unknown error occurred';
      throw new Error(`WooCommerce API error: ${errorMessage}`);
    }

    // Log success message
    let successMessage = 'Successfully processed tax rates: ';
    if (data.create && data.create.length) {
      successMessage += `Created ${data.create.length} rates. `;
    }
    if (data.update && data.update.length) {
      successMessage += `Updated ${data.update.length} rates. `;
    }
    if (data.delete && data.delete.length) {
      successMessage += `Deleted ${data.delete.length} rates.`;
    }
    log(successMessage);

    // Set the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
