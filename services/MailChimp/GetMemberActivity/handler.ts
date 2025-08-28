import * as mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';

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
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please add it in the connector settings.',
    );
  }
  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add it in the connector settings.',
    );
  }

  // Extract inputs
  const { listId, subscriberId, activityFilters, count, outputVariable } =
    inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }
  if (!subscriberId) {
    throw new Error('Subscriber Identifier is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare the subscriber hash - if it's an email, convert to MD5 hash
  let subscriberHash = subscriberId;
  if (subscriberId.includes('@')) {
    subscriberHash = md5(subscriberId.toLowerCase());
    log(`Converting email to MD5 hash: ${subscriberHash}`);
  }

  // Prepare request parameters
  const params: Record<string, any> = {};

  // Add count parameter if provided
  if (count) {
    const countValue = parseInt(count, 10);
    if (isNaN(countValue)) {
      throw new Error('Count must be a valid number');
    }
    if (countValue < 1 || countValue > 1000) {
      throw new Error('Count must be between 1 and 1000');
    }
    params.count = countValue;
  }

  // Add activity filters if provided
  if (activityFilters && activityFilters.length > 0) {
    // If activityFilters is already an array, join it; otherwise use as is
    const filtersValue = Array.isArray(activityFilters)
      ? activityFilters.join(',')
      : activityFilters;

    params.activity_filters = filtersValue;
    log(`Filtering activity by types: ${filtersValue}`);
  }

  log(`Retrieving activity for subscriber in list ${listId}`);

  try {
    // Make the API call to get member activity
    const response = await mailchimp.lists.getMemberActivity(
      listId,
      subscriberHash,
      params,
    );

    log(`Successfully retrieved ${response.activity.length} activity records`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    }
    throw error;
  }
};
