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
      'Missing MailChimp API Key. Please check your service configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please check your service configuration.',
    );
  }

  // Extract inputs
  const { listId, subscriberId, fields, excludeFields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error(
      'Missing List ID. Please provide a valid MailChimp list ID.',
    );
  }

  if (!subscriberId) {
    throw new Error(
      'Missing Subscriber Identifier. Please provide a valid email address or subscriber hash.',
    );
  }

  if (!outputVariable) {
    throw new Error(
      'Missing Output Variable. Please specify a variable name to store the results.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving goal events for subscriber in list "${listId}"...`);

  try {
    // Prepare query parameters
    const queryParams: Record<string, any> = {};

    if (fields) {
      queryParams.fields = fields;
    }

    if (excludeFields) {
      queryParams.exclude_fields = excludeFields;
    }

    // Make the API request
    const response = await mailchimp.lists.getListMemberGoals(
      listId,
      subscriberId,
      queryParams,
    );

    log(`Successfully retrieved ${response.goals?.length || 0} goal events.`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response) {
      const { status, detail } = error.response.body || {};
      throw new Error(
        `MailChimp API Error (${status}): ${detail || error.message}`,
      );
    } else {
      throw new Error(`Error retrieving member goals: ${error.message}`);
    }
  }
};
