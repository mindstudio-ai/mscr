import * as mailchimp from '@mailchimp/mailchimp_marketing';

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
      'Missing MailChimp API Key. Please add it in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please add it in the connector settings.',
    );
  }

  // Extract inputs with defaults
  const {
    count = '10',
    offset = '0',
    sortField,
    sortDir,
    outputVariable,
  } = inputs;

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Build query parameters
  const queryParams: Record<string, any> = {
    count: parseInt(count, 10),
    offset: parseInt(offset, 10),
  };

  // Add optional parameters if provided
  if (sortField) {
    queryParams.sort_field = sortField;
  }

  if (sortDir) {
    queryParams.sort_dir = sortDir;
  }

  try {
    log('Fetching Facebook ads reports from MailChimp...');

    // Make the API request to get Facebook ads reports
    const response =
      await mailchimp.reports.getFacebookAdsReportAll(queryParams);

    log(
      `Successfully retrieved ${response.facebook_ads.length} Facebook ads reports.`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else if (
      error.response &&
      error.response.body &&
      error.response.body.title
    ) {
      throw new Error(`MailChimp API Error: ${error.response.body.title}`);
    } else {
      throw new Error(`Error fetching Facebook ads reports: ${error.message}`);
    }
  }
};
