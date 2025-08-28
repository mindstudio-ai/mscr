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
      'Missing API Key. Please configure your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const {
    campaignId,
    feedbackId,
    message,
    blockId,
    isComplete,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!feedbackId) {
    throw new Error('Feedback ID is required');
  }

  if (!message) {
    throw new Error('Message is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare request body
  const requestBody: Record<string, any> = {
    message,
    is_complete: isComplete === 'true',
  };

  // Add blockId if provided
  if (blockId) {
    requestBody.block_id = parseInt(blockId, 10);
  }

  try {
    log(`Updating feedback message for campaign ${campaignId}`);

    // Make API request to update feedback
    const response = await mailchimp.campaigns.updateFeedbackMessage(
      campaignId,
      feedbackId,
      requestBody,
    );

    log('Feedback message updated successfully');

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Campaign or feedback not found. Please check your Campaign ID and Feedback ID.`,
        );
      } else if (error.message.includes('401')) {
        throw new Error(
          `Authentication failed. Please check your API Key and Server Prefix.`,
        );
      } else {
        throw new Error(`Failed to update feedback: ${error.message}`);
      }
    } else {
      throw new Error('An unknown error occurred while updating the feedback');
    }
  }
};
