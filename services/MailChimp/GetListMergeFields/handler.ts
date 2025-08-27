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
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Extract and validate inputs
  const { listId, count, offset, type, required, outputVariable } = inputs;

  if (!listId) {
    throw new Error(
      'List ID is required. Please provide a valid Mailchimp audience ID.',
    );
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving merge fields for list ID: ${listId}`);

  try {
    // Build parameters object, only including non-empty values
    const params: Record<string, any> = {};

    if (count) {
      params.count = parseInt(count, 10);
    }

    if (offset) {
      params.offset = parseInt(offset, 10);
    }

    if (type) {
      params.type = type;
    }

    if (required === 'true') {
      params.required = true;
    }

    // Make API request to Mailchimp
    const response = await mailchimp.lists.getListMergeFields(listId, params);

    log(`Successfully retrieved ${response.merge_fields.length} merge fields`);

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving merge fields: ${error.message}`);
    }
  }
};
