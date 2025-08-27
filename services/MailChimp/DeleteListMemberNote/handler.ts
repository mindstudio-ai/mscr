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
  // Extract API credentials from environment variables
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
  const { listId, subscriberHash, noteId } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required.');
  }

  if (!subscriberHash) {
    throw new Error('Subscriber Email or ID is required.');
  }

  if (!noteId) {
    throw new Error('Note ID is required.');
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log(`Deleting note ${noteId} for subscriber in list ${listId}...`);

    // Call the MailChimp API to delete the note
    await mailchimp.lists.deleteListMemberNote(listId, subscriberHash, noteId);

    log('Note deleted successfully.');
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error deleting note: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
