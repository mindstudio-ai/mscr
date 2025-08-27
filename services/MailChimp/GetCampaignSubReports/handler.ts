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
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { campaignId, fields, excludeFields, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare query parameters
  const params: Record<string, any> = {};

  // Process fields if provided
  if (fields) {
    params.fields = fields.split(',').map((field: string) => field.trim());
  }

  // Process exclude_fields if provided
  if (excludeFields) {
    params.exclude_fields = excludeFields
      .split(',')
      .map((field: string) => field.trim());
  }

  try {
    log(`Retrieving sub-reports for campaign: ${campaignId}`);

    // Make the API request to get campaign sub-reports
    const response = await mailchimp.reports.getReportsIdSubReportsId(
      campaignId,
      params,
    );

    log(
      `Successfully retrieved sub-reports. Found ${response.reports?.length || 0} sub-reports.`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response) {
      const { status, detail } = error.response.body || {};
      throw new Error(
        `Mailchimp API Error (${status}): ${detail || error.message}`,
      );
    } else {
      throw new Error(
        `Error retrieving campaign sub-reports: ${error.message}`,
      );
    }
  }
};
