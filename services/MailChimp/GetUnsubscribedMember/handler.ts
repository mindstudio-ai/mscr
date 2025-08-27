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
  // Extract inputs
  const { campaignId, subscriberHash, fields, excludeFields, outputVariable } =
    inputs;

  // Validate required environment variables
  const { apiKey, serverPrefix } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Mailchimp API Key in the service settings.',
    );
  }
  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your Mailchimp Server Prefix in the service settings.',
    );
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving unsubscribed member information for campaign: ${campaignId}`);

  try {
    // Prepare request parameters
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (fields) {
      params.fields = fields;
    }
    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    // Make API request to get unsubscribed member data
    const response = await mailchimp.reports.getReportsIdUnsubscribedId(
      campaignId,
      subscriberHash,
      params,
    );

    log('Successfully retrieved unsubscribed member information');

    // Set output variable with the response data
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common API errors
    if (error.status === 404) {
      throw new Error(
        `Resource not found: Either the campaign ID (${campaignId}) or subscriber hash (${subscriberHash}) is invalid.`,
      );
    } else if (error.status === 401) {
      throw new Error(
        'Authentication error: Please check your API key and server prefix.',
      );
    } else if (error.response && error.response.data) {
      throw new Error(
        `Mailchimp API error: ${error.response.data.detail || error.response.data.title || error.message}`,
      );
    } else {
      throw new Error(`Error retrieving unsubscribed member: ${error.message}`);
    }
  }
};
