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
  // Extract inputs
  const { listId, mergeId } = inputs;

  // Validate required environment variables
  const { apiKey, serverPrefix } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please check your MailChimp connection settings.',
    );
  }
  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please check your MailChimp connection settings.',
    );
  }

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }
  if (!mergeId) {
    throw new Error('Merge Field ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log(`Deleting merge field ${mergeId} from list ${listId}...`);

    // Call the MailChimp API to delete the merge field
    await mailchimp.lists.deleteListMergeField(listId, mergeId);

    log(`Successfully deleted merge field ${mergeId} from list ${listId}`);
  } catch (error) {
    // Handle specific error cases
    if (error.response && error.response.status === 404) {
      throw new Error(
        'The specified list or merge field could not be found. Please check your List ID and Merge Field ID.',
      );
    } else if (error.response && error.response.status === 401) {
      throw new Error(
        'Authentication failed. Please check your API key and server prefix.',
      );
    } else {
      // Log the detailed error for debugging but throw a user-friendly message
      console.error('MailChimp API Error:', error);
      throw new Error(
        `Failed to delete merge field: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
