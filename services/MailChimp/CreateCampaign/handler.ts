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
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure the MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure the MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    type,
    campaignName,
    subjectLine,
    previewText,
    fromName,
    replyTo,
    listId,
    autoFooter,
    inlineCss,
    outputVariable,
  } = inputs;

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Convert string boolean values to actual booleans
  const autoFooterBool = autoFooter === 'true' || autoFooter === true;
  const inlineCssBool = inlineCss === 'true' || inlineCss === true;

  // Prepare campaign data
  const campaignData = {
    type, // regular, plaintext, rss, variate
    recipients: {
      list_id: listId,
    },
    settings: {
      subject_line: subjectLine,
      title: campaignName,
      from_name: fromName,
      reply_to: replyTo,
      auto_footer: autoFooterBool,
      inline_css: inlineCssBool,
    },
  };

  // Add optional parameters if provided
  if (previewText) {
    campaignData.settings.preview_text = previewText;
  }

  log(`Creating a new ${type} campaign: "${campaignName}"`);

  try {
    // Create the campaign
    const response = await mailchimp.campaigns.create(campaignData);

    log(`Campaign created successfully with ID: ${response.id}`);

    // Set the output variable with the campaign ID
    setOutput(outputVariable, response.id);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw error;
    }
  }
};
