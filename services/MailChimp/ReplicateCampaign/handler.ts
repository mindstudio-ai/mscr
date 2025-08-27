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
  // Extract inputs
  const { campaignId, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please add it in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add it in the connector settings.',
    );
  }

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation being performed
    log(`Replicating campaign with ID: ${campaignId}...`);

    // Call Mailchimp API to replicate the campaign
    const response = await mailchimp.campaigns.replicate(campaignId);

    // Log success message
    log(`Campaign successfully replicated! New campaign ID: ${response.id}`);

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`Mailchimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error replicating campaign: ${error.message}`);
    }
  }
};
