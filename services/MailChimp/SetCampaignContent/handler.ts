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
      'Missing API Key. Please add your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    campaignId,
    contentSource,
    htmlContent,
    plainTextContent,
    url,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }

  if (contentSource === 'direct' && !htmlContent && !plainTextContent) {
    throw new Error(
      'When using direct input, either HTML content or plain text content must be provided.',
    );
  }

  if (contentSource === 'url' && !url) {
    throw new Error('URL is required when using URL import as content source.');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare the content request body
  const contentBody: Record<string, any> = {};

  if (contentSource === 'direct') {
    log('Preparing direct content for campaign update');

    if (htmlContent) {
      contentBody.html = htmlContent;
    }

    if (plainTextContent) {
      contentBody.plain_text = plainTextContent;
    }
  } else if (contentSource === 'url') {
    log(`Preparing to import content from URL: ${url}`);
    contentBody.url = url;
  }

  try {
    log(`Updating content for campaign with ID: ${campaignId}`);

    // Make the API call to set campaign content
    const response = await mailchimp.campaigns.setContent(
      campaignId,
      contentBody,
    );

    log('Campaign content updated successfully');

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error updating campaign content: ${error.message}`);
    }
  }
};
