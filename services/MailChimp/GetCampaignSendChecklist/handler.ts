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
  const { campaignId, fields, excludeFields, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
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

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving send checklist for campaign: ${campaignId}`);

  try {
    // Prepare optional parameters
    const options: Record<string, any> = {};

    if (fields) {
      options.fields = fields;
    }

    if (excludeFields) {
      options.exclude_fields = excludeFields;
    }

    // Make the API call to get the campaign send checklist
    const response = await mailchimp.campaigns.getSendChecklist(
      campaignId,
      options,
    );

    // Log the result
    if (response.is_ready) {
      log('Campaign is ready to send!');
    } else {
      const itemCount = response.items?.length || 0;
      log(
        `Campaign is not ready to send. Found ${itemCount} item${itemCount !== 1 ? 's' : ''} to resolve.`,
      );
    }

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(
        `Error retrieving campaign send checklist: ${error.message}`,
      );
    }
  }
};
