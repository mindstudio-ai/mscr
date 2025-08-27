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

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please add your API key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add your server prefix (e.g., "us19") in the connector settings.',
    );
  }

  // Extract inputs
  const { campaignId, count, sortField, sortDir, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving click details for campaign: ${campaignId}`);

  try {
    // Prepare parameters
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (count) {
      params.count = parseInt(count, 10);
    }

    if (sortField) {
      params.sort_field = sortField;
    }

    if (sortDir) {
      params.sort_dir = sortDir;
    }

    // Make API request
    const response = await mailchimp.reports.getCampaignClickDetails(
      campaignId,
      params,
    );

    log(
      `Successfully retrieved click details. Found ${response.urls_clicked.length} clicked URLs.`,
    );

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`Mailchimp API error: ${errorDetail}`);
    } else {
      throw new Error(
        `Error retrieving campaign click details: ${error.message || error}`,
      );
    }
  }
};
