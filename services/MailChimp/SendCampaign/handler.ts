import mailchimp from '@mailchimp/mailchimp_marketing';

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

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { campaignId, outputVariable } = inputs;

  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Preparing to send campaign with ID: ${campaignId}`);

  try {
    // Send the campaign
    await mailchimp.campaigns.send(campaignId);

    log('Campaign has been sent successfully');

    // Set the output variable
    setOutput(outputVariable, {
      success: true,
      message: 'Campaign has been sent successfully',
      campaignId,
    });
  } catch (error) {
    // Handle errors from the MailChimp API
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error sending campaign: ${errorMessage}`);

    // Provide more helpful error messages based on common issues
    if (errorMessage.includes('404')) {
      throw new Error(
        `Campaign with ID "${campaignId}" not found. Please check the Campaign ID and try again.`,
      );
    } else if (errorMessage.includes('401')) {
      throw new Error(
        'Authentication failed. Please check your API Key and Server Prefix.',
      );
    } else {
      throw new Error(`Failed to send campaign: ${errorMessage}`);
    }
  }
};
