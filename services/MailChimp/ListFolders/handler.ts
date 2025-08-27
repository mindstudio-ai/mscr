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
    createdBy,
    beforeCreatedAt,
    sinceCreatedAt,
    count = '10',
    offset = '0',
    outputVariable,
  } = inputs;

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare parameters for the API call
  const params: Record<string, any> = {};

  // Add optional parameters if they exist
  if (createdBy) {
    params.created_by = createdBy;
  }
  if (beforeCreatedAt) {
    params.before_created_at = beforeCreatedAt;
  }
  if (sinceCreatedAt) {
    params.since_created_at = sinceCreatedAt;
  }

  // Add pagination parameters
  params.count = parseInt(count, 10);
  params.offset = parseInt(offset, 10);

  log('Fetching folders from MailChimp File Manager...');

  try {
    // Make the API call to list folders
    const response = await mailchimp.fileManager.listFolders(params);

    log(
      `Successfully retrieved ${response.folders.length} folders (total available: ${response.total_items})`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(
        `Error fetching folders: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
