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
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
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

  // Extract inputs
  const {
    campaignId,
    count = '10',
    offset = '0',
    since,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare parameters for the API call
  const params: Record<string, any> = {
    count: parseInt(count, 10),
    offset: parseInt(offset, 10),
  };

  // Add optional parameters if provided
  if (since) {
    params.since = since;
  }

  log(`Retrieving email activity for campaign: ${campaignId}`);

  try {
    // Make API call to get email activity report
    const response = await mailchimp.reports.getCampaignEmailActivity(
      campaignId,
      params,
    );

    log(
      `Successfully retrieved email activity. Found ${response.emails.length} email records.`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors and provide helpful messages
    if (error.response && error.response.status === 404) {
      throw new Error(
        `Campaign with ID "${campaignId}" not found. Please check the ID and try again.`,
      );
    } else if (error.response && error.response.status === 401) {
      throw new Error(
        'Authentication failed. Please check your API key and server prefix.',
      );
    } else {
      throw new Error(
        `Failed to retrieve email activity: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
