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
  const { listId, interestCategoryId, fields, excludeFields, outputVariable } =
    inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey || !serverPrefix) {
    throw new Error(
      'Missing required environment variables: API Key and Server Prefix must be provided',
    );
  }

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!interestCategoryId) {
    throw new Error('Interest Category ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving interest category information from MailChimp...`);

  try {
    // Prepare optional parameters
    const options: Record<string, any> = {};

    if (fields) {
      options.fields = fields;
    }

    if (excludeFields) {
      options.exclude_fields = excludeFields;
    }

    // Make the API request
    const response = await mailchimp.lists.getInterestCategory(
      listId,
      interestCategoryId,
      options,
    );

    log(`Successfully retrieved interest category: "${response.title}"`);

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error retrieving interest category: ${error.message}`);
    }
  }
};
