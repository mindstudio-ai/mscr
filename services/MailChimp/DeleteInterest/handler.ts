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
  const { listId, interestCategoryId, interestId, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing MailChimp API Key. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing MailChimp Server Prefix. Please check your configuration.',
    );
  }

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!interestCategoryId) {
    throw new Error('Interest Category ID is required');
  }

  if (!interestId) {
    throw new Error('Interest ID is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation being performed
    log(
      `Deleting interest '${interestId}' from category '${interestCategoryId}' in list '${listId}'...`,
    );

    // Call the MailChimp API to delete the interest
    await mailchimp.lists.deleteInterestCategoryInterest(
      listId,
      interestCategoryId,
      interestId,
    );

    // Log success
    log('Interest deleted successfully');

    // Set the output variable with a success message
    setOutput(
      outputVariable,
      `Interest '${interestId}' was successfully deleted from category '${interestCategoryId}'`,
    );
  } catch (error) {
    // Handle API errors
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    log(`Error deleting interest: ${errorMessage}`);

    // Re-throw the error to be handled by the platform
    throw new Error(`Failed to delete interest: ${errorMessage}`);
  }
};
