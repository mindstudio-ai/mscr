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

  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your Mailchimp Server Prefix in the connector settings.',
    );
  }

  // Extract input parameters
  const { listId, title, type, displayOrder, outputVariable } = inputs;

  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!title) {
    throw new Error('Category Name is required');
  }

  if (!type) {
    throw new Error('Display Type is required');
  }

  // Initialize the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Creating interest category "${title}" for list ${listId}...`);

  try {
    // Prepare the request body
    const requestBody: Record<string, any> = {
      title,
      type,
    };

    // Add optional display order if provided
    if (displayOrder) {
      requestBody.display_order = parseInt(displayOrder, 10);
    }

    // Create the interest category
    const response = await mailchimp.lists.createInterestCategory(
      listId,
      requestBody,
    );

    log(`Successfully created interest category: ${response.title}`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error creating interest category: ${error.message}`);
    }
  }
};
