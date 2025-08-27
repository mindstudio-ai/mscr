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
  const { fileId, fields, excludeFields, outputVar } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey || !serverPrefix) {
    throw new Error(
      'Missing required environment variables: apiKey and serverPrefix must be provided',
    );
  }

  // Validate required inputs
  if (!fileId) {
    throw new Error('Missing required input: fileId must be provided');
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving file information for file ID: ${fileId}`);

  try {
    // Prepare optional parameters
    const options: Record<string, any> = {};

    if (fields) {
      options.fields = fields;
      log(`Including only these fields: ${fields}`);
    }

    if (excludeFields) {
      options.exclude_fields = excludeFields;
      log(`Excluding these fields: ${excludeFields}`);
    }

    // Make the API request to get file information
    const fileInfo = await mailchimp.fileManager.getFile(fileId, options);

    log(
      `Successfully retrieved information for file: ${fileInfo.name || fileId}`,
    );

    // Set the output variable with the file information
    setOutput(outputVar, fileInfo);
  } catch (error) {
    // Handle errors from the MailChimp API
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving file information: ${error.message}`);
    }
  }
};
