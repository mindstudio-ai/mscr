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
      'Missing Mailchimp API Key. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please check your configuration.',
    );
  }

  // Extract inputs
  const { campaignId, fields, excludeFields, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output Variable is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving EepURL activity for campaign: ${campaignId}`);

  try {
    // Prepare request parameters
    const params: Record<string, any> = {};

    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make the API request
    const response = await mailchimp.reports.getEepurlActivityForCampaign(
      campaignId,
      params,
    );

    log('Successfully retrieved EepURL activity data');

    // Set the output
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving EepURL activity: ${error.message}`);
    }
  }
};
