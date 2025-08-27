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
  const { fileId, outputVariable } = inputs;

  // Validate required inputs
  if (!fileId) {
    throw new Error('File ID is required');
  }

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'MailChimp API Key is missing. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'MailChimp Server Prefix is missing. Please check your configuration.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation
    log(`Deleting file with ID: ${fileId}`);

    // Delete the file from MailChimp File Manager
    await mailchimp.fileManager.deleteFile(fileId);

    // Log success
    log('File successfully deleted');

    // Set the output variable with confirmation message
    setOutput(outputVariable, 'File successfully deleted');
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error deleting file: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
