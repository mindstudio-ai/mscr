import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing MailChimp API Key. Please configure it in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please configure it in the service settings.',
    );
  }

  // Extract inputs
  const { fileName, fileContent, folderId, outputVariable } = inputs;

  // Validate required inputs
  if (!fileName) {
    throw new Error('File Name is required');
  }

  if (!fileContent) {
    throw new Error('File Content is required');
  }

  // Configure MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Preparing to upload file "${fileName}" to MailChimp File Manager...`);

  try {
    // Prepare request body
    const requestBody: {
      name: string;
      file_data: string;
      folder_id?: number;
    } = {
      name: fileName,
      file_data: fileContent,
    };

    // Add folder ID if provided
    if (folderId) {
      requestBody.folder_id = parseInt(folderId, 10);
      log(`Uploading to folder ID: ${folderId}`);
    } else {
      log('Uploading to root folder');
    }

    // Upload file to MailChimp
    const response = await mailchimp.fileManager.upload(requestBody);

    log(`File "${fileName}" successfully uploaded to MailChimp File Manager`);
    log(`File URL: ${response.full_size_url}`);

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error uploading file to MailChimp: ${error.message}`);
    }
  }
};
