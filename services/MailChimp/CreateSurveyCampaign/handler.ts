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
  const {
    listId,
    surveyId,
    subjectLine,
    previewText,
    campaignTitle,
    fromName,
    replyTo,
    toName,
    useConversation,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!surveyId) {
    throw new Error('Survey ID is required');
  }

  if (!subjectLine) {
    throw new Error('Subject Line is required');
  }

  if (!fromName) {
    throw new Error('From Name is required');
  }

  if (!replyTo) {
    throw new Error('Reply To email is required');
  }

  // Configure MailChimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  // Prepare campaign settings
  const settings: Record<string, string | boolean> = {
    subject_line: subjectLine,
    from_name: fromName,
    reply_to: replyTo,
  };

  // Add optional settings if provided
  if (previewText) {
    settings.preview_text = previewText;
  }

  if (campaignTitle) {
    settings.title = campaignTitle;
  }

  if (toName) {
    settings.to_name = toName;
  }

  if (useConversation === 'true') {
    settings.use_conversation = true;
  }

  try {
    log(
      `Creating survey campaign for list "${listId}" and survey "${surveyId}"...`,
    );

    // Make API request to create the survey campaign
    const response = await mailchimp.lists.createSurveyEmailCampaign(
      listId,
      surveyId,
      {
        settings: settings,
      },
    );

    // Extract campaign ID from response
    const campaignId = response.id;

    log(`Survey campaign created successfully with ID: ${campaignId}`);

    // Set output variable
    setOutput(outputVariable, campaignId);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else if (error.message) {
      throw new Error(`Error creating survey campaign: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while creating survey campaign');
    }
  }
};
