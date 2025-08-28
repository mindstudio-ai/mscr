import crypto from 'crypto';
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

  // Validate required environment variables
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

  // Extract inputs
  const { listId, email, confirmDeletion, outputVariable } = inputs;

  // Check if deletion is confirmed
  if (confirmDeletion !== 'yes') {
    log('Member deletion cancelled. No changes were made.');
    setOutput(
      outputVariable,
      'Member deletion cancelled. No changes were made.',
    );
    return;
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Create MD5 hash of lowercase email address (MailChimp requirement)
    const subscriberHash = crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    log(
      `Preparing to permanently delete member with email: ${email} from list: ${listId}`,
    );

    // Make the API call to permanently delete the member
    await mailchimp.lists.deleteListMemberPermanent(listId, subscriberHash);

    const successMessage = `Successfully deleted member with email: ${email} from list: ${listId}`;
    log(successMessage);
    setOutput(outputVariable, successMessage);
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    log(`Failed to delete member: ${errorMessage}`);

    // Provide more helpful error messages for common issues
    if (errorMessage.includes('404')) {
      throw new Error(
        `Member with email ${email} not found in list ${listId}. Please check if the email and list ID are correct.`,
      );
    } else if (errorMessage.includes('401')) {
      throw new Error(
        'Authentication failed. Please check your MailChimp API Key and Server Prefix.',
      );
    } else {
      throw new Error(`Failed to delete member: ${errorMessage}`);
    }
  }
};
