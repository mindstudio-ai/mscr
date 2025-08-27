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
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    status,
    count,
    offset,
    vipOnly,
    sortField,
    sortDir,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  // Configure MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Connecting to MailChimp to retrieve members from list: ${listId}`);

  // Build query parameters
  const params: Record<string, any> = {};

  // Add optional parameters if provided
  if (status) {
    params.status = status;
  }
  if (count) {
    params.count = parseInt(count, 10);
  }
  if (offset) {
    params.offset = parseInt(offset, 10);
  }
  if (vipOnly === 'true') {
    params.vip_only = true;
  }
  if (sortField) {
    params.sort_field = sortField;
  }
  if (sortDir) {
    params.sort_dir = sortDir;
  }

  try {
    // Make API request to get list members
    log('Fetching list members...');
    const response = await mailchimp.lists.getListMembersInfo(listId, params);

    log(
      `Successfully retrieved ${response.members.length} members from the list`,
    );

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error fetching list members: ${error.message || error}`);
    }
  }
};
