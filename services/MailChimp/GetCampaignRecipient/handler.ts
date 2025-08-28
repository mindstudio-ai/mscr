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
    throw new Error('Missing Mailchimp API Key in environment variables');
  }
  if (!serverPrefix) {
    throw new Error('Missing Mailchimp Server Prefix in environment variables');
  }

  // Extract inputs
  const { campaignId, subscriberHash, fields, excludeFields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }
  if (!subscriberHash) {
    throw new Error('Subscriber Hash/Email is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log('Connecting to Mailchimp...');

  // Determine if the subscriberHash is an email or already a hash
  // If it contains @ symbol, assume it's an email and convert to MD5 hash
  let subscriberHashValue = subscriberHash;
  if (subscriberHash.includes('@')) {
    log('Converting email address to MD5 hash...');
    subscriberHashValue = crypto
      .createHash('md5')
      .update(subscriberHash.toLowerCase())
      .digest('hex');
  }

  // Prepare request parameters
  const params: Record<string, any> = {};
  if (fields) {
    params.fields = fields;
  }
  if (excludeFields) {
    params.exclude_fields = excludeFields;
  }

  try {
    log(`Retrieving information for recipient in campaign ${campaignId}...`);

    // Make API request to get campaign recipient info
    const response = await mailchimp.reports.getCampaignRecipient(
      campaignId,
      subscriberHashValue,
      params,
    );

    log('Successfully retrieved recipient information');

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving campaign recipient: ${error.message}`);
    }
  }
};
