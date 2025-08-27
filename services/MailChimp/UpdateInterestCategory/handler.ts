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
      'Missing API Key. Please add your Mailchimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your Mailchimp Server Prefix (e.g., us19) in the connector settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    interestCategoryId,
    title,
    type,
    displayOrder,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!interestCategoryId) {
    throw new Error('Interest Category ID is required');
  }

  if (!title) {
    throw new Error('Category Name is required');
  }

  if (!type) {
    throw new Error('Display Type is required');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Updating interest category "${title}" in list ${listId}...`);

  try {
    // Prepare the update payload
    const updatePayload: Record<string, any> = {
      title,
      type,
    };

    // Add optional parameters if provided
    if (displayOrder) {
      updatePayload.display_order = parseInt(displayOrder, 10);
    }

    // Make the API call to update the interest category
    const response = await mailchimp.lists.updateInterestCategory(
      listId,
      interestCategoryId,
      updatePayload,
    );

    log(`Successfully updated interest category "${response.title}"`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error updating interest category: ${error.message}`);
    }
  }
};
