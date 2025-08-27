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
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your MailChimp API Key in the service settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please configure your MailChimp Server Prefix in the service settings.',
    );
  }

  // Extract inputs
  const {
    count,
    email,
    sortField,
    sortDir,
    includeTotalContacts,
    outputVariable,
  } = inputs;

  // Configure the Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log('Connecting to MailChimp API...');

  try {
    // Prepare parameters for the API call
    const params: Record<string, any> = {};

    // Add optional parameters if they are provided
    if (count) {
      params.count = parseInt(count, 10);
    }

    if (email) {
      params.email = email;
    }

    if (sortField) {
      params.sort_field = sortField;
    }

    if (sortDir) {
      params.sort_dir = sortDir;
    }

    if (includeTotalContacts === 'true') {
      params.include_total_contacts = true;
    }

    log('Fetching lists from MailChimp...');

    // Make the API call to get lists
    const response = await mailchimp.lists.getAllLists(params);

    log(`Successfully retrieved ${response.lists.length} lists.`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.body) {
      const errorDetail =
        error.response.body.detail ||
        error.response.body.message ||
        JSON.stringify(error.response.body);
      throw new Error(`MailChimp API Error: ${errorDetail}`);
    } else {
      throw new Error(`Error fetching MailChimp lists: ${error.message}`);
    }
  }
};
