import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs
  const { campaignId, shortcutType, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey || !serverPrefix) {
    throw new Error(
      'Missing required environment variables: apiKey and serverPrefix must be set',
    );
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix, // e.g., us19
  });

  try {
    // Log the action being taken
    log(
      `Resending campaign ${campaignId} to ${shortcutType.replace('_', ' ')}`,
    );

    // Call the Mailchimp API to resend the campaign
    const response = await mailchimp.campaigns.createResend(campaignId, {
      shortcut_type: shortcutType,
    });

    // Log success
    log(`Campaign successfully resent. New campaign ID: ${response.id}`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle specific error cases
    if (error.status === 401) {
      throw new Error('Authentication failed. Please check your API key.');
    } else if (error.status === 404) {
      throw new Error(`Campaign with ID ${campaignId} not found.`);
    } else if (error.status === 403) {
      throw new Error(
        'Permission denied. Your account may not have access to this feature.',
      );
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      // Handle general errors
      const errorMessage =
        error.response?.body?.detail ||
        error.message ||
        'Unknown error occurred';
      throw new Error(`Failed to resend campaign: ${errorMessage}`);
    }
  }
};
