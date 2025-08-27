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
      'Missing MailChimp API Key. Please configure it in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please configure it in the service settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    subscriberId,
    count,
    offset,
    fields,
    excludeFields,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!subscriberId) {
    throw new Error('Subscriber Identifier is required');
  }

  if (!outputVariable) {
    throw new Error('Output Variable is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare optional parameters
  const options: Record<string, any> = {};

  if (count) {
    options.count = parseInt(count, 10);
  }

  if (offset) {
    options.offset = parseInt(offset, 10);
  }

  if (fields) {
    options.fields = fields;
  }

  if (excludeFields) {
    options.exclude_fields = excludeFields;
  }

  try {
    log(`Retrieving events for subscriber in list ${listId}...`);

    // Call the MailChimp API to get list member events
    const response = await mailchimp.lists.getListMemberEvents(
      listId,
      subscriberId,
      options,
    );

    log(
      `Successfully retrieved ${response.events?.length || 0} events for the subscriber`,
    );

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
      throw new Error(`Error retrieving list member events: ${error.message}`);
    }
  }
};
