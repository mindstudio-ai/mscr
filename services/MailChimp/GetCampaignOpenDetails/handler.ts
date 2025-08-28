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
    count,
    offset,
    since,
    sortField,
    sortDir,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Initialize the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Fetching open details for campaign: ${campaignId}`);

  try {
    // Build query parameters
    const params: Record<string, any> = {};

    if (count) {
      params.count = parseInt(count, 10);
    }
    if (offset) {
      params.offset = parseInt(offset, 10);
    }
    if (since) {
      params.since = since;
    }
    if (sortField) {
      params.sort_field = sortField;
    }
    if (sortDir) {
      params.sort_dir = sortDir;
    }

    // Make the API request
    const response = await mailchimp.reports.getCampaignOpenDetails(
      campaignId,
      params,
    );

    log(
      `Successfully retrieved open details. Found ${response.total_opens} total opens from ${response.members.length} members.`,
    );

    // Set the output
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`Mailchimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error fetching campaign open details: ${error.message}`);
    }
  }
};
