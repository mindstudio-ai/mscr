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

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { campaignId, reportId, fields, excludeFields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!reportId) {
    throw new Error('Report ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving abuse report ${reportId} for campaign ${campaignId}...`);

  try {
    // Prepare parameters for the API call
    const params: Record<string, any> = {};

    if (fields) {
      params.fields = fields;
    }

    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make the API call to get the abuse report
    const response = await mailchimp.reports.getCampaignAbuseReport(
      campaignId,
      reportId,
      params,
    );

    log('Successfully retrieved abuse report');

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors from the API
    if (error.response) {
      const { status, detail } = error.response.body || {};
      throw new Error(
        `MailChimp API Error (${status}): ${detail || error.message}`,
      );
    } else {
      throw new Error(`Error retrieving abuse report: ${error.message}`);
    }
  }
};
