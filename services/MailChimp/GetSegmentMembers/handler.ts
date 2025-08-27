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
    segmentId,
    count = '10',
    offset = '0',
    includeUnsubscribed = 'false',
    includeCleaned = 'false',
    includeTransactional = 'false',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error(
      'Missing List ID. Please provide a valid MailChimp list ID.',
    );
  }

  if (!segmentId) {
    throw new Error('Missing Segment ID. Please provide a valid segment ID.');
  }

  // Configure MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving members from segment ${segmentId} in list ${listId}...`);

  try {
    // Convert string boolean values to actual booleans
    const includeCleaned_bool = includeCleaned === 'true';
    const includeUnsubscribed_bool = includeUnsubscribed === 'true';
    const includeTransactional_bool = includeTransactional === 'true';

    // Convert count and offset to numbers
    const countNum = parseInt(count, 10);
    const offsetNum = parseInt(offset, 10);

    // Prepare parameters for the API call
    const params: Record<string, any> = {
      count: countNum,
      offset: offsetNum,
    };

    // Only add these parameters if they are true
    if (includeCleaned_bool) {
      params.include_cleaned = includeCleaned_bool;
    }

    if (includeUnsubscribed_bool) {
      params.include_unsubscribed = includeUnsubscribed_bool;
    }

    if (includeTransactional_bool) {
      params.include_transactional = includeTransactional_bool;
    }

    // Make the API call to get segment members
    const response = await mailchimp.lists.getListsIdSegmentsIdMembers(
      listId,
      segmentId,
      params,
    );

    log(
      `Successfully retrieved ${response.members.length} members from the segment.`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors from the MailChimp API
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving segment members: ${error.message}`);
    }
  }
};
