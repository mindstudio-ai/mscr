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
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { campaignId, fields, excludeFields, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving campaign report for campaign ID: ${campaignId}`);

  try {
    // Prepare parameters for the API call
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (fields && fields.trim() !== '') {
      params.fields = fields.split(',').map((field: string) => field.trim());
    }

    if (excludeFields && excludeFields.trim() !== '') {
      params.exclude_fields = excludeFields
        .split(',')
        .map((field: string) => field.trim());
    }

    // Make the API call to get the campaign report
    const response = await mailchimp.reports.getCampaignReport(
      campaignId,
      params,
    );

    log('Successfully retrieved campaign report');

    // Set the output variable with the campaign report data
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error retrieving campaign report: ${error.message}`);
    }
  }
};
