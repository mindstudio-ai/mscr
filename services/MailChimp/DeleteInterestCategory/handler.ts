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
      'Missing API Key. Please configure your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the connector settings.',
    );
  }

  // Extract inputs
  const { listId, interestCategoryId } = inputs;

  // Validate inputs
  if (!listId) {
    throw new Error(
      'Missing List ID. Please provide a valid MailChimp list ID.',
    );
  }

  if (!interestCategoryId) {
    throw new Error(
      'Missing Interest Category ID. Please provide a valid interest category ID.',
    );
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  try {
    log(
      `Deleting interest category ${interestCategoryId} from list ${listId}...`,
    );

    // Call the MailChimp API to delete the interest category
    await mailchimp.lists.deleteInterestCategory(listId, interestCategoryId);

    log('Interest category deleted successfully.');

    // Set outputs
    setOutput('success', true);
    setOutput(
      'message',
      `Interest category ${interestCategoryId} was successfully deleted from list ${listId}.`,
    );
  } catch (error) {
    log(`Error deleting interest category: ${error.message}`);

    // Handle API error
    if (error.response && error.response.body) {
      const errorDetail = error.response.body.detail || error.message;
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    }

    throw error;
  }
};
