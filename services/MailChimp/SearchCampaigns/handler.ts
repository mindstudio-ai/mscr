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
      'Missing API Key. Please check your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please check your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { query, fields, excludeFields, outputVariable } = inputs;

  if (!query) {
    throw new Error('Search query is required.');
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Searching MailChimp campaigns for: "${query}"`);

  try {
    // Prepare parameters for the API call
    const params: Record<string, any> = { query };

    // Add optional parameters if provided
    if (fields) {
      // Convert comma-separated string to array if needed
      params.fields =
        typeof fields === 'string'
          ? fields.split(',').map((field) => field.trim())
          : fields;
    }

    if (excludeFields) {
      // Convert comma-separated string to array if needed
      params.exclude_fields =
        typeof excludeFields === 'string'
          ? excludeFields.split(',').map((field) => field.trim())
          : excludeFields;
    }

    // Make the API call to search campaigns
    const response = await mailchimp.searchCampaigns.search(params);

    log(
      `Found ${response.total_items} campaigns matching your search criteria.`,
    );

    // Set the output variable with the search results
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      // If it's a structured API error
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      // For other errors
      throw new Error(`Error searching campaigns: ${error.message || error}`);
    }
  }
};
