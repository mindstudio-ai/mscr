import mailchimp from '@mailchimp/mailchimp_marketing';

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
  // Extract inputs
  const { listId, fields, excludeFields, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure the Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure the Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Validate required inputs
  if (!listId) {
    throw new Error(
      'Missing List ID. Please provide a valid Mailchimp list ID.',
    );
  }

  // Initialize the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving location data for list: ${listId}`);

  try {
    // Prepare parameters for the API call
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make the API call to get list locations
    const response = await mailchimp.lists.getListLocations(listId, params);

    log(
      `Successfully retrieved location data. Found ${response.locations.length} locations.`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error retrieving list locations: ${error.message}`);
      throw new Error(`Failed to retrieve list locations: ${error.message}`);
    } else {
      log('An unknown error occurred while retrieving list locations');
      throw new Error(
        'An unknown error occurred while retrieving list locations',
      );
    }
  }
};
