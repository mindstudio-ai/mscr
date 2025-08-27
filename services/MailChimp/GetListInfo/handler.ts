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
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    includeTotalContacts,
    fields,
    excludeFields,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving information for list with ID: ${listId}`);

  try {
    // Prepare query parameters
    const params: Record<string, any> = {};

    if (includeTotalContacts === 'true') {
      params.include_total_contacts = true;
    }

    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make the API request
    const response = await mailchimp.lists.getList(listId, params);

    log(`Successfully retrieved list information for "${response.name}"`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        JSON.stringify(error.response.body);
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error retrieving list information: ${error.message}`);
    }
  }
};
