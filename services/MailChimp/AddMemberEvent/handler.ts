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

  if (!apiKey || !serverPrefix) {
    throw new Error(
      'Missing required environment variables: API Key or Server Prefix',
    );
  }

  // Extract inputs
  const {
    listId,
    subscriberId,
    eventName,
    eventProperties,
    occurredAt,
    preventAutomations,
    outputVariable,
  } = inputs;

  // Initialize MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(
    `Preparing to add "${eventName}" event for subscriber in list "${listId}"`,
  );

  // Convert email to MD5 hash if it looks like an email
  let subscriberHash = subscriberId;
  if (subscriberId.includes('@')) {
    subscriberHash = crypto
      .createHash('md5')
      .update(subscriberId.toLowerCase())
      .digest('hex');
    log('Converted email address to required MD5 hash format');
  }

  // Prepare request body
  const eventData: any = {
    name: eventName,
  };

  // Add optional properties if provided
  if (eventProperties) {
    eventData.properties = eventProperties;
  }

  // Add event time if provided, otherwise MailChimp will use current time
  if (occurredAt) {
    eventData.occurred_at = occurredAt;
  }

  // Set is_syncing flag based on preventAutomations
  if (preventAutomations === 'true') {
    eventData.is_syncing = true;
    log('Event configured to not trigger automations');
  }

  try {
    log('Sending event data to MailChimp...');

    // Make API call to add the event
    const response = await mailchimp.lists.createListMemberEvent(
      listId,
      subscriberHash,
      eventData,
    );

    log(`Successfully added "${eventName}" event for the subscriber`);

    // The API returns 204 No Content on success with an empty response
    // We'll create a result object with status information
    const result = {
      success: true,
      message: `Successfully added "${eventName}" event for subscriber`,
      timestamp: new Date().toISOString(),
    };

    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error adding event: ${error.message}`);

    // Create error result object
    const errorResult = {
      success: false,
      error: error.message,
      details: error.response?.body || {},
    };

    setOutput(outputVariable, errorResult);

    // Re-throw the error to indicate failure
    throw error;
  }
};
