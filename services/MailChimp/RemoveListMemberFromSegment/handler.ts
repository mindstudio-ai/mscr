import crypto from 'crypto';
import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
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
      'Missing Mailchimp API Key. Please add your API key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add your server prefix (e.g., us19) in the connector settings.',
    );
  }

  // Extract inputs
  const { listId, segmentId, subscriberEmail } = inputs;

  // Validate inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!segmentId) {
    throw new Error('Segment ID is required');
  }

  if (!subscriberEmail) {
    throw new Error('Subscriber Email is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Convert email to MD5 hash (Mailchimp requirement)
  // Email must be lowercase before hashing
  const subscriberHash = crypto
    .createHash('md5')
    .update(subscriberEmail.toLowerCase())
    .digest('hex');

  log(
    `Removing subscriber ${subscriberEmail} from segment ${segmentId} in list ${listId}...`,
  );

  try {
    // Remove member from segment
    await mailchimp.lists.removeSegmentMember(
      listId,
      segmentId,
      subscriberHash,
    );

    log(`Successfully removed subscriber ${subscriberEmail} from the segment`);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error removing subscriber from segment: ${error.message}`,
      );
    }
  }
};
