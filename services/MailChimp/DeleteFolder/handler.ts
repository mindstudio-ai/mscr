import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
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
      'Missing MailChimp API Key. Please check your service configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please check your service configuration.',
    );
  }

  // Extract input
  const { folderId } = inputs;

  // Validate input
  if (!folderId) {
    throw new Error('Folder ID is required. Please provide a valid folder ID.');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation being performed
    log(`Attempting to delete folder with ID: ${folderId}`);

    // Call the MailChimp API to delete the folder
    await mailchimp.fileManager.deleteFolder(folderId);

    // Log success message
    log(`Successfully deleted folder with ID: ${folderId}`);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`Failed to delete folder: ${errorDetail}`);
    } else {
      throw new Error(
        `Failed to delete folder: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
