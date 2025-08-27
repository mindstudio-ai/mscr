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
  const { listId, interestCategoryId, name, displayOrder, outputVariable } =
    inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!interestCategoryId) {
    throw new Error('Interest Category ID is required');
  }

  if (!name) {
    throw new Error('Interest Name is required');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // Prepare the request payload
  const payload: {
    name: string;
    display_order?: number;
  } = {
    name,
  };

  // Add optional display order if provided
  if (displayOrder) {
    payload.display_order = parseInt(displayOrder, 10);
  }

  try {
    log(
      `Creating interest "${name}" in category ${interestCategoryId} for list ${listId}...`,
    );

    // Make the API request to create the interest
    const response = await mailchimp.lists.createInterestCategoryInterest(
      listId,
      interestCategoryId,
      payload,
    );

    log(
      `Successfully created interest "${response.name}" with ID: ${response.id}`,
    );

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { title, detail, status } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${title} - ${detail}`);
    } else {
      throw new Error(`Error creating interest: ${error.message}`);
    }
  }
};
