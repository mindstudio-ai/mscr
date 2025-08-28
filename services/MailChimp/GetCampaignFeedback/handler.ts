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
  const { campaignId, fields, excludeFields, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey || !serverPrefix) {
    throw new Error(
      'Missing required environment variables: API Key and Server Prefix must be provided',
    );
  }

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare request parameters
  const params: Record<string, any> = {};

  // Add optional parameters if provided
  if (fields) {
    params.fields = fields;
  }

  if (excludeFields) {
    params.exclude_fields = excludeFields;
  }

  try {
    log(`Retrieving feedback for campaign ${campaignId}...`);

    // Make API call to get campaign feedback
    const response = await mailchimp.campaigns.getFeedback(campaignId, params);

    log(`Successfully retrieved ${response.total_items} feedback items`);

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the API responded with a status code
      // that falls out of the range of 2xx
      const { status, detail } = error.response.body || {};
      throw new Error(
        `Mailchimp API Error (${status}): ${detail || error.message}`,
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(`No response received from Mailchimp: ${error.message}`);
    } else {
      // Something happened in setting up the request
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};
