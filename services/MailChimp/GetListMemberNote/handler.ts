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
  const { listId, subscriberHash, noteId, outputVariable } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
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

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving note ID ${noteId} for subscriber in list ${listId}`);

  try {
    // Make the API call to get the member note
    const response = await mailchimp.lists.getMemberNote(
      listId,
      subscriberHash,
      noteId,
    );

    log(`Successfully retrieved note created by ${response.created_by}`);

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.title ||
        error.message;
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error retrieving member note: ${error.message}`);
    }
  }
};
