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
      'Mailchimp API Key is required. Please check your connection settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Mailchimp Server Prefix is required. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { fileId, fileName, folderId, outputVariable } = inputs;

  // Validate required inputs
  if (!fileId) {
    throw new Error('File ID is required.');
  }

  if (!outputVariable) {
    throw new Error('Output Variable is required.');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare request body (only include properties that are provided)
  const updateData: Record<string, any> = {};

  if (fileName !== undefined && fileName !== '') {
    updateData.name = fileName;
    log(`Updating file name to: ${fileName}`);
  }

  if (folderId !== undefined && folderId !== '') {
    // Convert folderId to integer (Mailchimp API expects an integer)
    updateData.folder_id = parseInt(folderId, 10);

    if (updateData.folder_id === 0) {
      log('Removing file from its current folder');
    } else {
      log(`Moving file to folder with ID: ${updateData.folder_id}`);
    }
  }

  // If no updates were specified, inform the user
  if (Object.keys(updateData).length === 0) {
    log('No changes specified. File will remain unchanged.');
  }

  try {
    log(`Updating file with ID: ${fileId}`);

    // Make the API request to update the file
    const response = await mailchimp.fileManager.updateFile(fileId, updateData);

    log('File updated successfully');

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`Mailchimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(
        `Error updating file: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
