import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

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
      'Missing API Key. Please configure your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your Mailchimp Server Prefix (e.g., us19) in the connector settings.',
    );
  }

  // Extract inputs
  const {
    campaignId,
    subscriberHash,
    since,
    fields,
    excludeFields,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!subscriberHash) {
    throw new Error('Subscriber Email or Hash is required');
  }

  // Initialize Mailchimp client
  log('Initializing Mailchimp client');
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Process subscriber hash - if it's an email, convert to MD5 hash
  let processedSubscriberHash = subscriberHash;
  if (subscriberHash.includes('@')) {
    log('Converting email address to MD5 hash');
    processedSubscriberHash = crypto
      .createHash('md5')
      .update(subscriberHash.toLowerCase())
      .digest('hex');
  }

  // Build request parameters
  const params: Record<string, any> = {};

  if (since) {
    params.since = since;
  }

  if (fields) {
    params.fields = fields;
  }

  if (excludeFields) {
    params.exclude_fields = excludeFields;
  }

  try {
    // Make API request
    log(
      `Fetching email activity for campaign ID: ${campaignId} and subscriber`,
    );
    const response = await mailchimp.reports.getEmailActivityForSubscriber(
      campaignId,
      processedSubscriberHash,
      params,
    );

    log('Successfully retrieved subscriber email activity');
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error fetching subscriber email activity: ${error.message}`,
      );
    }
  }
};
