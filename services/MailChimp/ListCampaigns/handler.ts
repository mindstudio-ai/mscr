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
    campaignType,
    campaignStatus,
    listId,
    count = '10',
    offset = '0',
    outputVariable,
  } = inputs;

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log('Connecting to Mailchimp...');

  try {
    // Build parameters for the API call
    const params: Record<string, any> = {};

    // Only add parameters that have values
    if (campaignType) {
      params.type = campaignType;
    }
    if (campaignStatus) {
      params.status = campaignStatus;
    }
    if (listId) {
      params.list_id = listId;
    }

    // Convert count and offset to numbers
    params.count = parseInt(count, 10);
    params.offset = parseInt(offset, 10);

    // Validate count is within allowed range
    if (params.count > 1000) {
      log('Warning: Maximum count is 1000. Using 1000 as the count value.');
      params.count = 1000;
    }

    log(`Fetching campaigns with the specified filters...`);

    // Make the API call to get campaigns
    const response = await mailchimp.campaigns.list(params);

    log(`Successfully retrieved ${response.campaigns.length} campaigns.`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error fetching campaigns: ${error.message}`);
    }
  }
};
