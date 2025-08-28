import * as mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Get environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure the Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure the Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Get inputs
  const {
    campaignId,
    fields,
    excludeFields,
    includeResendShortcutEligibility,
    includeResendShortcutUsage,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving information for campaign: ${campaignId}`);

  try {
    // Prepare request parameters
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Convert string boolean values to actual booleans
    if (includeResendShortcutEligibility === 'true') {
      params.include_resend_shortcut_eligibility = true;
    }

    if (includeResendShortcutUsage === 'true') {
      params.include_resend_shortcut_usage = true;
    }

    // Make API request to get campaign information
    const response = await mailchimp.campaigns.get(campaignId, params);

    log('Successfully retrieved campaign information');

    // Set output variable with the campaign information
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`Mailchimp API Error: ${error.response.body.detail}`);
    } else {
      throw new Error(
        `Error retrieving campaign information: ${error.message}`,
      );
    }
  }
};
