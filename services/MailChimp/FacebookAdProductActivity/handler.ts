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

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please check your configuration.',
    );
  }

  // Extract inputs
  const { outreachId, count, offset, sortField, fields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!outreachId) {
    throw new Error('Facebook Ad Outreach ID is required');
  }

  // Configure Mailchimp client
  log('Initializing Mailchimp client...');
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare request parameters
  const params: Record<string, any> = {};

  // Add optional parameters if provided
  if (count) {
    params.count = parseInt(count, 10);
  }
  if (offset) {
    params.offset = parseInt(offset, 10);
  }
  if (sortField) {
    params.sort_field = sortField;
  }
  if (fields) {
    params.fields = fields;
  }

  try {
    // Log the request being made
    log(
      `Retrieving product activity for Facebook ad outreach ID: ${outreachId}...`,
    );

    // Make API request to get Facebook ad product activity report
    const response =
      await mailchimp.reporting.getFacebookAdProductActivityReport(
        outreachId,
        params,
      );

    // Log success message with count of products retrieved
    const productCount = response.products?.length || 0;
    log(
      `Successfully retrieved ${productCount} products from the Facebook ad product activity report`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // API responded with an error
      const status = error.response.status;
      const detail = error.response.data?.detail || 'Unknown error';

      throw new Error(`Mailchimp API error (${status}): ${detail}`);
    } else {
      // Network or other error
      throw new Error(
        `Error retrieving Facebook ad product activity: ${error.message}`,
      );
    }
  }
};
