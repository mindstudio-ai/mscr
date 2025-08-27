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
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error('Missing MailChimp API Key in environment variables');
  }

  if (!serverPrefix) {
    throw new Error('Missing MailChimp Server Prefix in environment variables');
  }

  // Extract inputs
  const {
    listId,
    interestCategoryId,
    interestId,
    fields,
    excludeFields,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!interestCategoryId) {
    throw new Error('Interest Category ID is required');
  }

  if (!interestId) {
    throw new Error('Interest ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output Variable is required');
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare optional parameters
  const options: Record<string, any> = {};

  if (fields) {
    options.fields = fields;
  }

  if (excludeFields) {
    options.exclude_fields = excludeFields;
  }

  try {
    log(
      `Retrieving interest details for list: ${listId}, category: ${interestCategoryId}, interest: ${interestId}`,
    );

    // Make the API request to get interest details
    const response = await mailchimp.lists.getInterestCategoryInterest(
      listId,
      interestCategoryId,
      interestId,
      options,
    );

    log(`Successfully retrieved interest details for "${response.name}"`);

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error retrieving interest details: ${error.message}`);
    }
  }
};
