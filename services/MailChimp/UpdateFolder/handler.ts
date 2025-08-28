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
  // Extract inputs
  const { folderId, folderName, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
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

  // Validate required inputs
  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  if (!folderName) {
    throw new Error('New Folder Name is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation
    log(`Updating folder with ID: ${folderId} to name: "${folderName}"`);

    // Call the MailChimp API to update the folder
    const response = await mailchimp.fileManager.updateFolder(folderId, {
      name: folderName,
    });

    // Log success
    log(`Successfully updated folder to "${response.name}"`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error updating folder: ${error.message}`);
    }
  }
};
