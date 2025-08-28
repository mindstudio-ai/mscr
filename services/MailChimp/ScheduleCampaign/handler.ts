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
  if (!apiKey || !serverPrefix) {
    throw new Error(
      'Missing required API credentials. Please check your Mailchimp API Key and Server Prefix.',
    );
  }

  // Extract and validate inputs
  const {
    campaignId,
    scheduleTime,
    useTimewarp = 'false',
    useBatchDelivery = 'false',
    batchDelay,
    batchCount,
  } = inputs;

  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!scheduleTime) {
    throw new Error('Schedule Time is required');
  }

  // Convert string boolean values to actual booleans
  const timewarpEnabled = useTimewarp === 'true';
  const batchDeliveryEnabled = useBatchDelivery === 'true';

  // Validate that timewarp and batch delivery are not both enabled
  if (timewarpEnabled && batchDeliveryEnabled) {
    throw new Error('Timewarp and Batch Delivery cannot be used together');
  }

  // Validate batch delivery parameters if enabled
  if (batchDeliveryEnabled && (!batchDelay || !batchCount)) {
    throw new Error(
      'Batch Delay and Batch Count are required when Batch Delivery is enabled',
    );
  }

  // Initialize the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Preparing to schedule campaign ${campaignId} for ${scheduleTime}`);

  // Build request body
  const requestBody: any = {
    schedule_time: scheduleTime,
  };

  // Add timewarp if enabled
  if (timewarpEnabled) {
    requestBody.timewarp = true;
    log(
      "Timewarp enabled: Campaign will be sent based on recipients' local time zones",
    );
  }

  // Add batch delivery if enabled
  if (batchDeliveryEnabled) {
    requestBody.batch_delivery = {
      batch_delay: parseInt(batchDelay, 10),
      batch_count: parseInt(batchCount, 10),
    };
    log(
      `Batch Delivery enabled: Campaign will be sent in ${batchCount} batches with ${batchDelay} minute intervals`,
    );
  }

  try {
    // Make the API call to schedule the campaign
    await mailchimp.campaigns.schedule(campaignId, requestBody);
    log(`Campaign scheduled successfully for ${scheduleTime}`);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { title, detail, status } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${title} - ${detail}`);
    } else {
      throw new Error(`Failed to schedule campaign: ${error.message || error}`);
    }
  }
};
