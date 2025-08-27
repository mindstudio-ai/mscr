import * as mailchimp from '@mailchimp/mailchimp_marketing';

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
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { campaignId, subjectLine, fromName, replyTo, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log('Connecting to Mailchimp...');

    // Build settings object, only including properties that are provided
    const settings: Record<string, any> = {};

    if (subjectLine !== undefined) {
      settings.subject_line = subjectLine;
    }

    if (fromName !== undefined) {
      settings.from_name = fromName;
    }

    if (replyTo !== undefined) {
      settings.reply_to = replyTo;
    }

    // Only include settings in the update if at least one setting is provided
    const updateParams: Record<string, any> = {};
    if (Object.keys(settings).length > 0) {
      updateParams.settings = settings;
    }

    // If no settings were provided, inform the user
    if (Object.keys(updateParams).length === 0) {
      log(
        'No campaign settings were provided to update. Campaign will remain unchanged.',
      );
    } else {
      log(`Updating campaign with ID: ${campaignId}...`);

      // Log which settings are being updated
      const updatingFields = Object.keys(settings)
        .map((key) => {
          // Convert snake_case to readable format
          return key
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        })
        .join(', ');

      log(`Updating the following fields: ${updatingFields}`);
    }

    // Call Mailchimp API to update the campaign
    const response = await mailchimp.campaigns.update(campaignId, updateParams);

    log('Campaign updated successfully');

    // Set the output variable with the API response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      // Extract detailed error information from Mailchimp API response
      const { status, detail, title } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${title} - ${detail}`);
    } else {
      // Handle other errors
      throw new Error(`Error updating campaign: ${error.message}`);
    }
  }
};
