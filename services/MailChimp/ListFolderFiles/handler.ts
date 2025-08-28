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

  if (!apiKey) {
    throw new Error(
      'Missing MailChimp API Key. Please check your service configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please check your service configuration.',
    );
  }

  // Extract inputs
  const { folderId, fileType, sortField, sortDir, count, outputVar } = inputs;

  // Validate required inputs
  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Connecting to MailChimp to retrieve files from folder ID: ${folderId}`);

  try {
    // Build query parameters
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (fileType) {
      params.type = fileType;
    }

    if (sortField) {
      params.sort_field = sortField;
    }

    if (sortDir) {
      params.sort_dir = sortDir;
    }

    if (count) {
      // Ensure count is a number and within limits
      const countNum = parseInt(count, 10);
      if (isNaN(countNum)) {
        throw new Error('Count must be a valid number');
      }

      if (countNum < 1 || countNum > 1000) {
        throw new Error('Count must be between 1 and 1000');
      }

      params.count = countNum;
    }

    // Make the API request to list files in the folder
    const response = await mailchimp.fileManager.listFiles(folderId, params);

    log(
      `Successfully retrieved ${response.files.length} files from the folder`,
    );

    // Set the output variable with the full response
    setOutput(outputVar, response);
  } catch (error) {
    // Handle errors from the MailChimp API
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving files: ${error.message || error}`);
    }
  }
};
