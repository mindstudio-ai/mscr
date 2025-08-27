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

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please check your service connection configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please check your service connection configuration.',
    );
  }

  // Extract inputs
  const { conversationId, fields, excludeFields, outputVariable } = inputs;

  // Validate required inputs
  if (!conversationId) {
    throw new Error('Conversation ID is required.');
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare request options
  const options: Record<string, any> = {};

  // Add optional parameters if provided
  if (fields) {
    options.fields = fields;
  }

  if (excludeFields) {
    options.exclude_fields = excludeFields;
  }

  try {
    log(`Retrieving conversation with ID: ${conversationId}`);

    // Make the API request to get conversation details
    const response = await mailchimp.conversations.get(conversationId, options);

    log('Successfully retrieved conversation details');

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, detail } = error.response.body || {};
      throw new Error(
        `Mailchimp API Error (${status}): ${detail || error.message}`,
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(`No response received from Mailchimp: ${error.message}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error making request to Mailchimp: ${error.message}`);
    }
  }
};
