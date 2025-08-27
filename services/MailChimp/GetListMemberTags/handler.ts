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
    count = '10',
    offset = '0',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!subscriberId) {
    throw new Error('Subscriber Identifier is required');
  }

  // Configure MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Parse numeric inputs
  const parsedCount = parseInt(count, 10);
  const parsedOffset = parseInt(offset, 10);

  // Prepare query parameters
  const params: Record<string, any> = {};

  if (!isNaN(parsedCount)) {
    params.count = parsedCount;
  }

  if (!isNaN(parsedOffset)) {
    params.offset = parsedOffset;
  }

  try {
    log(`Retrieving tags for subscriber in list ${listId}`);

    // Call MailChimp API to get member tags
    const response = await mailchimp.lists.getListMemberTags(
      listId,
      subscriberId,
      params,
    );

    log(
      `Successfully retrieved ${response.tags.length} tags for the subscriber`,
    );

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { title, detail, status } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${title} - ${detail}`);
    } else {
      throw new Error(`Error retrieving member tags: ${error.message}`);
    }
  }
};
