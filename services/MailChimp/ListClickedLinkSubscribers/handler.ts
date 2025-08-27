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
  // Extract environment variables
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
  const { campaignId, linkId, count, offset, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!linkId) {
    throw new Error('Link ID is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare request parameters
  const params: Record<string, any> = {};

  // Add optional parameters if provided
  if (count) {
    params.count = parseInt(count, 10);
  }

  if (offset) {
    params.offset = parseInt(offset, 10);
  }

  log(
    `Fetching subscribers who clicked on link ID ${linkId} in campaign ${campaignId}...`,
  );

  try {
    // Make API request to get clicked link subscribers
    const response = await mailchimp.reports.getCampaignClickDetailMembers(
      campaignId,
      linkId,
      params,
    );

    log(
      `Successfully retrieved ${response.members.length} subscribers out of ${response.total_items} total`,
    );

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error fetching clicked link subscribers: ${error.message}`,
      );
    }
  }
};
