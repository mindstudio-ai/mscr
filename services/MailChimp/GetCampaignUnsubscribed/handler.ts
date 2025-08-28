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
      'Missing API Key. Please add your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    campaignId,
    count = '10',
    offset = '0',
    fields,
    excludeFields,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Configure the Mailchimp client
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
  if (fields) {
    params.fields = fields;
  }
  if (excludeFields) {
    params.exclude_fields = excludeFields;
  }

  try {
    log(`Fetching unsubscribed members for campaign: ${campaignId}`);

    // Make the API request to get unsubscribed members
    const response = await mailchimp.reports.getCampaignUnsubscribedMembers(
      campaignId,
      params,
    );

    log(
      `Successfully retrieved ${response.unsubscribes?.length || 0} unsubscribed members out of ${response.total_items} total`,
    );

    // Set the output with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response) {
      const { status, detail } = error.response.body || {};
      throw new Error(
        `Mailchimp API Error (${status}): ${detail || error.message}`,
      );
    } else {
      throw new Error(`Error fetching unsubscribed members: ${error.message}`);
    }
  }
};
