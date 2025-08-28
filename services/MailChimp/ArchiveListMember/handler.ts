import mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
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
      'Missing MailChimp API Key. Please check your connection settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { listId, subscriberIdentifier } = inputs;

  // Validate inputs
  if (!listId) {
    throw new Error('List ID is required.');
  }

  if (!subscriberIdentifier) {
    throw new Error('Member Identifier is required.');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log(`Archiving member ${subscriberIdentifier} from list ${listId}...`);

    // Call the MailChimp API to archive the list member
    await mailchimp.lists.deleteListMember(listId, subscriberIdentifier);

    log(`Successfully archived member ${subscriberIdentifier} from the list.`);
  } catch (error) {
    // Handle API errors with user-friendly messages
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;

      if (status === 404) {
        throw new Error(`Member not found: ${detail}`);
      } else {
        throw new Error(`MailChimp API Error (${status}): ${detail}`);
      }
    } else {
      throw new Error(`Error archiving member: ${error.message}`);
    }
  }
};
