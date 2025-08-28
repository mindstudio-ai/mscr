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
      'Missing Mailchimp API Key. Please add it in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please add it in the connector settings.',
    );
  }

  // Extract input parameters
  const {
    listId,
    interestCategoryId,
    interestId,
    name,
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

  if (!interestId) {
    throw new Error('Interest ID is required');
  }

  if (!name) {
    throw new Error('Interest Name is required');
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(
    `Updating interest "${name}" in category ${interestCategoryId} for list ${listId}`,
  );

  try {
    // Prepare request body
    const updateData: Record<string, any> = {
      name,
    };

    // Add optional display order if provided
    if (displayOrder) {
      // Convert string to number if needed
      updateData.display_order = parseInt(displayOrder, 10);

      // Validate the parsed number
      if (isNaN(updateData.display_order)) {
        throw new Error('Display Order must be a valid number');
      }
    }

    // Make API request to update the interest
    const response = await mailchimp.lists.updateInterestCategoryInterest(
      listId,
      interestCategoryId,
      interestId,
      updateData,
    );

    log(`Successfully updated interest to "${response.name}"`);

    // Set output variable with the API response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors with clear messages
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`Mailchimp API Error (${status}): ${detail}`);
    }

    throw new Error(`Error updating interest: ${error.message}`);
  }
};
