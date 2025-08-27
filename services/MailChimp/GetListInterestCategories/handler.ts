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

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please add it in the connector configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add it in the connector configuration.',
    );
  }

  // Extract inputs
  const {
    listId,
    count = '10',
    offset = '0',
    type = '',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare parameters for the API call
  const params: Record<string, any> = {};

  // Add optional parameters if provided
  if (count) {
    params.count = parseInt(count, 10);
  }
  if (offset) {
    params.offset = parseInt(offset, 10);
  }
  if (type) {
    params.type = type;
  }

  try {
    // Log the action being performed
    log(`Retrieving interest categories for list ID: ${listId}`);

    // Make the API call to get interest categories
    const response = await mailchimp.lists.getListInterestCategories(
      listId,
      params,
    );

    // Log success message with count of categories retrieved
    log(
      `Successfully retrieved ${response.categories.length} interest categories`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors from the API
    if (error instanceof Error) {
      // Check if it's a 404 error (list not found)
      if (error.message.includes('404')) {
        throw new Error(
          `List with ID "${listId}" not found. Please check your List ID and try again.`,
        );
      }

      // For other errors, provide a more detailed message
      throw new Error(
        `Failed to retrieve interest categories: ${error.message}`,
      );
    } else {
      throw new Error(
        'An unknown error occurred while retrieving interest categories',
      );
    }
  }
};
