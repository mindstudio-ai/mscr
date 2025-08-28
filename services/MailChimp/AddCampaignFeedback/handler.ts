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
      'Missing Mailchimp API Key. Please add it in the connector configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add it in the connector configuration.',
    );
  }

  // Extract inputs
  const { campaignId, message, blockId, isComplete, outputVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!message) {
    throw new Error('Feedback message is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Adding feedback to campaign: ${campaignId}`);

  // Prepare feedback payload
  const feedbackData: {
    message: string;
    block_id?: number;
    is_complete?: boolean;
  } = {
    message,
  };

  // Add optional parameters if provided
  if (blockId) {
    feedbackData.block_id = parseInt(blockId, 10);
  }

  if (isComplete !== undefined) {
    feedbackData.is_complete = isComplete === 'true';
  }

  try {
    // Make API call to add feedback
    const response = await mailchimp.campaigns.addFeedback(
      campaignId,
      feedbackData,
    );

    log('Successfully added feedback to campaign');

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error adding feedback: ${error.message}`);
    }
  }
};
