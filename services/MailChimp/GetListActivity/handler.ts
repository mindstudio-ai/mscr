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
      'Missing Mailchimp API Key. Please configure it in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please configure it in the service settings.',
    );
  }

  // Extract inputs
  const { listId, count, offset, outputVariable } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output Variable is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare parameters
  const params: Record<string, any> = {};

  if (count) {
    params.count = parseInt(count, 10);
  }

  if (offset) {
    params.offset = parseInt(offset, 10);
  }

  try {
    // Log the action
    log(`Retrieving activity for Mailchimp list: ${listId}`);

    // Call the Mailchimp API
    const response = await mailchimp.lists.getListActivity(listId, params);

    // Log success
    log(
      `Successfully retrieved list activity with ${response.activity?.length || 0} records`,
    );

    // Set the output
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      // Check for common errors
      if (error.message.includes('404')) {
        throw new Error(
          `List not found: ${listId}. Please check your List ID.`,
        );
      } else if (error.message.includes('401')) {
        throw new Error(
          'Authentication failed. Please check your API Key and Server Prefix.',
        );
      } else {
        throw new Error(`Mailchimp API error: ${error.message}`);
      }
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
