import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    count = '10',
    offset = '0',
    type,
    includeCleanedMembers,
    includeUnsubscribedMembers,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required.');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving segments for list: ${listId}`);

  try {
    // Prepare parameters for the API call
    const params: Record<string, any> = {
      count: parseInt(count, 10),
      offset: parseInt(offset, 10),
    };

    // Add optional parameters if provided
    if (type) {
      params.type = type;
    }

    if (includeCleanedMembers === 'true') {
      params.include_cleaned = true;
    }

    if (includeUnsubscribedMembers === 'true') {
      params.include_unsubscribed = true;
    }

    // Make the API request
    const response = await mailchimp.lists.listSegments(listId, params);

    log(`Successfully retrieved ${response.segments.length} segments`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors from the MailChimp API
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving segments: ${error.message}`);
    }
  }
};
