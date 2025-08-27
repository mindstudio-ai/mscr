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
  const { folderId, fields, excludeFields, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the service settings.',
    );
  }

  // Validate required inputs
  if (!folderId) {
    throw new Error('Missing Folder ID. Please provide a valid folder ID.');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare optional parameters
  const params: Record<string, any> = {};

  if (fields) {
    params.fields = fields;
  }

  if (excludeFields) {
    params.exclude_fields = excludeFields;
  }

  try {
    // Log the operation
    log(`Retrieving folder information for folder ID: ${folderId}`);

    // Make the API request
    const response = await mailchimp.fileManager.getFolderById(
      folderId,
      params,
    );

    // Log success
    log(`Successfully retrieved folder information for "${response.name}"`);

    // Set the output
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle specific error cases
    if (error.status === 404) {
      throw new Error(
        `Folder with ID ${folderId} not found. Please check the folder ID and try again.`,
      );
    } else if (error.status === 401) {
      throw new Error(
        'Authentication failed. Please check your API Key and Server Prefix.',
      );
    } else {
      // Handle general errors
      const errorMessage =
        error.response?.body?.detail ||
        error.message ||
        'Unknown error occurred';
      throw new Error(`MailChimp API Error: ${errorMessage}`);
    }
  }
};
