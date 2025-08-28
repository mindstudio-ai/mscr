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
  // Get environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the service settings.',
    );
  }

  // Get inputs
  const { listId, subscriberEmail, note, outputVariable } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error(
      'Missing List ID. Please provide a valid MailChimp list ID.',
    );
  }

  if (!subscriberEmail) {
    throw new Error(
      'Missing Subscriber Email. Please provide a valid email address.',
    );
  }

  if (!note) {
    throw new Error('Missing Note. Please provide note content.');
  }

  // Configure MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Convert email to MD5 hash (lowercase first as required by MailChimp)
  const subscriberHash = crypto
    .createHash('md5')
    .update(subscriberEmail.toLowerCase())
    .digest('hex');

  log(`Adding note to subscriber ${subscriberEmail} in list ${listId}`);

  try {
    // Call MailChimp API to add note to subscriber
    const response = await mailchimp.lists.createListMemberNote(
      listId,
      subscriberHash,
      { note },
    );

    log('Successfully added note to subscriber');

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error adding note to subscriber: ${error.message}`);
    }
  }
};
