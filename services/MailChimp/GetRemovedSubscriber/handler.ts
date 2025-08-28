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
  const { workflowId, subscriberHash, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your MailChimp API key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your MailChimp server prefix in the connector settings.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation being performed
    log(
      `Retrieving information for subscriber ${subscriberHash} removed from workflow ${workflowId}...`,
    );

    // Make the API call to get the removed subscriber information
    const response = await mailchimp.automations.getRemovedSubscriber(
      workflowId,
      subscriberHash,
    );

    // Log success
    log(
      `Successfully retrieved information for subscriber ${response.email_address || subscriberHash}`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        'Unknown error';
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(
        `Error retrieving subscriber information: ${error.message || error}`,
      );
    }
  }
};
