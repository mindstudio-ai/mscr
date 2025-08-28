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
  const { campaignId, linkId, subscriberHash, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please check your MailChimp API Key configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please check your MailChimp Server Prefix configuration.',
    );
  }

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Missing Campaign ID. Please provide a valid campaign ID.');
  }

  if (!linkId) {
    throw new Error('Missing Link ID. Please provide a valid link ID.');
  }

  if (!subscriberHash) {
    throw new Error(
      'Missing Subscriber Hash. Please provide a valid subscriber hash.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation
    log(
      `Retrieving information for subscriber ${subscriberHash} who clicked link ${linkId} in campaign ${campaignId}...`,
    );

    // Make the API call to get the clicked link subscriber information
    const response = await mailchimp.reports.getClickDetailMember(
      campaignId,
      linkId,
      subscriberHash,
    );

    // Log success
    log(`Successfully retrieved subscriber information.`);

    // Set the output variable
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error retrieving subscriber information: ${error.message}`,
      );
    }
  }
};
