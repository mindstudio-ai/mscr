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
      'Missing MailChimp API Key. Please configure it in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please configure it in the service settings.',
    );
  }

  // Extract inputs
  const { campaignId, testEmails, sendType, successVariable } = inputs;

  // Validate required inputs
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  if (!testEmails) {
    throw new Error('Test email addresses are required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Parse email addresses from comma-separated string to array
    const emailArray = testEmails
      .split(',')
      .map((email: string) => email.trim())
      .filter((email: string) => email.length > 0);

    if (emailArray.length === 0) {
      throw new Error('No valid email addresses provided');
    }

    log(
      `Sending test email to ${emailArray.length} recipient(s) in ${sendType} format`,
    );

    // Send the test email
    await mailchimp.campaigns.sendTestEmail(campaignId, {
      test_emails: emailArray,
      send_type: sendType,
    });

    log('Test email sent successfully');

    // Set the output variable to true to indicate success
    setOutput(successVariable, true);
  } catch (error) {
    log(
      `Error sending test email: ${error instanceof Error ? error.message : String(error)}`,
    );

    // Set the output variable to false to indicate failure
    setOutput(successVariable, false);

    // Re-throw the error to be handled by the platform
    throw error;
  }
};
