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
      'Missing Mailchimp API Key. Please add your API key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add your server prefix (e.g., us19) in the connector settings.',
    );
  }

  // Extract inputs
  const { campaignId, subscriberHash, fields, excludeFields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!subscriberHash) {
    throw new Error('Subscriber Hash is required');
  }

  if (!outputVariable) {
    throw new Error('Output Variable is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Getting subscriber information for campaign ${campaignId}`);

  try {
    // Prepare optional parameters
    const params: Record<string, any> = {};

    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make API request to get subscriber information
    const response = await mailchimp.reports.getSubscriberInfoForOpenedCampaign(
      campaignId,
      subscriberHash,
      params,
    );

    log('Successfully retrieved subscriber information');

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response) {
      const { status, detail } = error.response.body || {};
      throw new Error(
        `Mailchimp API Error (${status}): ${detail || error.message}`,
      );
    } else {
      throw new Error(`Error: ${error.message || 'Unknown error occurred'}`);
    }
  }
};
