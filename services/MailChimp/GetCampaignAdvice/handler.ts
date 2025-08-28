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
    throw new Error(
      'Missing Mailchimp API Key. Please add it in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add it in the connector settings.',
    );
  }

  // Extract inputs
  const { campaignId, fields, excludeFields, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Fetching advice for campaign: ${campaignId}`);

  try {
    // Prepare parameters
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make API request
    const response = await mailchimp.reports.getCampaignAdvice(
      campaignId,
      params,
    );

    log(
      `Successfully retrieved ${response.total_items || 0} advice items for the campaign`,
    );

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`Mailchimp API Error: ${errorDetail}`);
    } else {
      throw new Error(
        `Error fetching campaign advice: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
