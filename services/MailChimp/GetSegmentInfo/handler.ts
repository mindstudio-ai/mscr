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
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    segmentId,
    includeCleaned,
    includeTransactional,
    includeUnsubscribed,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('Missing List ID. Please provide a valid List ID.');
  }

  if (!segmentId) {
    throw new Error('Missing Segment ID. Please provide a valid Segment ID.');
  }

  if (!outputVariable) {
    throw new Error(
      'Missing Output Variable. Please specify an output variable name.',
    );
  }

  // Configure MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Convert string boolean values to actual booleans
  const params: Record<string, any> = {};

  if (includeCleaned !== undefined) {
    params.include_cleaned = includeCleaned === 'true';
  }

  if (includeTransactional !== undefined) {
    params.include_transactional = includeTransactional === 'true';
  }

  if (includeUnsubscribed !== undefined) {
    params.include_unsubscribed = includeUnsubscribed === 'true';
  }

  try {
    log(
      `Retrieving segment information for segment ID: ${segmentId} from list ID: ${listId}`,
    );

    // Call the MailChimp API to get segment info
    const response = await mailchimp.lists.getListSegment(
      listId,
      segmentId,
      params,
    );

    log(`Successfully retrieved segment: ${response.name}`);

    // Set the output variable with the segment information
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(`Error retrieving segment information: ${error.message}`);
    }
  }
};
