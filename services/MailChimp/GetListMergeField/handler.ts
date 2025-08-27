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
      'Missing API Key. Please add your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { listId, mergeId, fields, excludeFields, outputVariable } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error(
      'Missing List ID. Please provide a valid Mailchimp audience ID.',
    );
  }

  if (!mergeId) {
    throw new Error(
      'Missing Merge Field ID. Please provide a valid merge field ID.',
    );
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare optional parameters
  const options: Record<string, any> = {};

  if (fields) {
    options.fields = fields;
  }

  if (excludeFields) {
    options.exclude_fields = excludeFields;
  }

  try {
    // Log the operation
    log(`Retrieving merge field ${mergeId} from list ${listId}...`);

    // Make the API request
    const response = await mailchimp.lists.getListMergeField(
      listId,
      mergeId,
      options,
    );

    // Log success
    log(
      `Successfully retrieved merge field: ${response.name} (${response.tag})`,
    );

    // Set the output
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response) {
      const { status, detail } = error.response.body || {};
      throw new Error(
        `Mailchimp API Error (${status}): ${detail || error.message}`,
      );
    }

    // Handle other errors
    throw new Error(`Error retrieving merge field: ${error.message}`);
  }
};
