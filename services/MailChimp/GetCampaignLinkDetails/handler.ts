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
  const { campaignId, linkId, fields, excludeFields, outputVariable } = inputs;

  // Validate required environment variables
  const apiKey = process.env.apiKey;
  const serverPrefix = process.env.serverPrefix;

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

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare options for the API call
  const options: Record<string, any> = {};

  if (fields) {
    options.fields = fields;
  }

  if (excludeFields) {
    options.exclude_fields = excludeFields;
  }

  try {
    log(
      `Retrieving click details for link ID ${linkId} in campaign ${campaignId}...`,
    );

    // Make the API call to get campaign link details
    const response = await mailchimp.reports.getCampaignClickDetailsForLink(
      campaignId,
      linkId,
      options,
    );

    log('Successfully retrieved campaign link details');

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors and provide helpful messages
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404) {
        throw new Error(
          `Campaign or link not found. Please check your Campaign ID and Link ID.`,
        );
      } else {
        throw new Error(
          `MailChimp API Error (${status}): ${data.detail || data.message || JSON.stringify(data)}`,
        );
      }
    } else {
      throw new Error(
        `Error retrieving campaign link details: ${error.message}`,
      );
    }
  }
};
