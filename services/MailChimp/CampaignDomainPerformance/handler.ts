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
      'Missing required environment variables: API Key and Server Prefix are required',
    );
  }

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  log(`Retrieving domain performance data for campaign: ${campaignId}`);

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Prepare request parameters
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make the API request to get domain performance data
    const response = await mailchimp.reports.getDomainPerformanceForCampaign(
      campaignId,
      params,
    );

    log(
      `Successfully retrieved domain performance data for campaign: ${campaignId}`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors gracefully
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`Mailchimp API error: ${errorDetail}`);
    } else {
      throw new Error(`Error retrieving domain performance: ${error.message}`);
    }
  }
};
