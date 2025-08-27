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
      'MailChimp API Key is required. Please check your connection settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'MailChimp Server Prefix is required. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { campaignId, count, offset, sortField, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Fetching product activity for campaign: ${campaignId}`);

  try {
    // Prepare parameters for the API call
    const params: Record<string, any> = {};

    // Add optional parameters if provided
    if (count) {
      params.count = parseInt(count, 10);
    }

    if (offset) {
      params.offset = parseInt(offset, 10);
    }

    if (sortField) {
      params.sort_field = sortField;
    }

    // Make the API call to get campaign product activity
    const response =
      await mailchimp.reports.getEcommerceProductActivityForCampaign(
        campaignId,
        params,
      );

    log(
      `Successfully retrieved product activity data with ${response.products?.length || 0} products`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const detail = error.response.data?.detail || 'Unknown error';

      if (status === 401) {
        throw new Error(
          `Authentication failed: ${detail}. Please check your API key.`,
        );
      } else if (status === 404) {
        throw new Error(
          `Campaign not found: ${detail}. Please check your Campaign ID.`,
        );
      } else if (status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`MailChimp API error (${status}): ${detail}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from MailChimp. Please check your internet connection and try again.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error: ${error.message}`);
    }
  }
};
