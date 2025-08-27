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
  const { apiKey, serverPrefix } = process.env;

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
    workflowId,
    workflowEmailId,
    subjectLine,
    previewText,
    title,
    fromName,
    replyTo,
    delayAmount,
    delayType,
    delayDirection,
    delayAction,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!workflowId) {
    throw new Error('Workflow ID is required');
  }

  if (!workflowEmailId) {
    throw new Error('Workflow Email ID is required');
  }

  // Configure the client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log('Updating workflow email...');

  try {
    // Build request payload
    const payload: Record<string, any> = {};

    // Add settings if any are provided
    if (subjectLine || previewText || title || fromName || replyTo) {
      payload.settings = {};

      if (subjectLine) {
        payload.settings.subject_line = subjectLine;
      }
      if (previewText) {
        payload.settings.preview_text = previewText;
      }
      if (title) {
        payload.settings.title = title;
      }
      if (fromName) {
        payload.settings.from_name = fromName;
      }
      if (replyTo) {
        payload.settings.reply_to = replyTo;
      }
    }

    // Add delay settings if any are provided
    if (delayAmount || delayType || delayDirection || delayAction) {
      payload.delay = {};

      if (delayAmount) {
        payload.delay.amount = parseInt(delayAmount, 10);
      }
      if (delayType) {
        payload.delay.type = delayType;
      }
      if (delayDirection) {
        payload.delay.direction = delayDirection;
      }
      if (delayAction) {
        payload.delay.action = delayAction;
      }
    }

    // Only make the API call if we have settings to update
    if (Object.keys(payload).length === 0) {
      throw new Error(
        'No update parameters provided. Please provide at least one setting to update.',
      );
    }

    // Make API request
    const response = await mailchimp.automations.updateWorkflowEmail(
      workflowId,
      workflowEmailId,
      payload,
    );

    log('Successfully updated workflow email');

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body && error.response.body.detail) {
      throw new Error(`MailChimp API Error: ${error.response.body.detail}`);
    } else if (error.message) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while updating the workflow email',
      );
    }
  }
};
