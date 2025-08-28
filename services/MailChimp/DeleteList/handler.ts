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
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please check your service configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please check your service configuration.',
    );
  }

  // Extract and validate inputs
  const { listId, confirmDeletion } = inputs;

  if (!listId) {
    throw new Error('List ID is required');
  }

  // Check confirmation status
  if (confirmDeletion !== 'confirmed') {
    throw new Error('Deletion not confirmed. Operation cancelled.');
  }

  // Initialize the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Preparing to delete list with ID: ${listId}`);
  log(
    'WARNING: This action will permanently delete the list and all associated data.',
  );

  try {
    // Delete the list
    await mailchimp.lists.deleteList(listId);
    log('List successfully deleted');
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error deleting list: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
