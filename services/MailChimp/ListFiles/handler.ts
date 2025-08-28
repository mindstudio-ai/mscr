import * as mailchimp from '@mailchimp/mailchimp_marketing';

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
    throw new Error('Missing API Key in environment variables');
  }

  if (!serverPrefix) {
    throw new Error('Missing Server Prefix in environment variables');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Extract inputs with proper type handling
  const {
    fileType,
    createdBy,
    sinceCreatedAt,
    beforeCreatedAt,
    count,
    offset,
    sortField,
    sortDir,
    outputVar,
  } = inputs;

  // Build query parameters
  const params: Record<string, any> = {};

  if (fileType) {
    params.type = fileType;
  }
  if (createdBy) {
    params.created_by = createdBy;
  }
  if (sinceCreatedAt) {
    params.since_created_at = sinceCreatedAt;
  }
  if (beforeCreatedAt) {
    params.before_created_at = beforeCreatedAt;
  }
  if (count) {
    params.count = parseInt(count, 10);
  }
  if (offset) {
    params.offset = parseInt(offset, 10);
  }
  if (sortField) {
    params.sort_field = sortField;
  }
  if (sortDir) {
    params.sort_dir = sortDir;
  }

  log('Fetching files from MailChimp File Manager...');

  try {
    // Make API request to get files
    const response = await mailchimp.fileManager.files(params);

    log(`Successfully retrieved ${response.files.length} files`);

    // Set the output variable with the response
    setOutput(outputVar, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw error;
    }
  }
};
