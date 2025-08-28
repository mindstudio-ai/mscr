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
  const { folderName, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please check your configuration.',
    );
  }

  // Initialize the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Creating folder "${folderName}" in Mailchimp File Manager...`);

  try {
    // Create the folder in Mailchimp File Manager
    const response = await mailchimp.fileManager.createFolder({
      name: folderName,
    });

    log(`Successfully created folder "${folderName}" with ID: ${response.id}`);

    // Set the output variable with the folder data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`Mailchimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error creating folder: ${error.message || error}`);
    }
  }
};
