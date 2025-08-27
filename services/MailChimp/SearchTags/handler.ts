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
  const { listId, tagName, outputVariable } = inputs;
  const { apiKey, serverPrefix } = process.env;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!apiKey || !serverPrefix) {
    throw new Error('MailChimp API Key and Server Prefix are required');
  }

  // Configure MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    log(`Searching for tags in list: ${listId}`);

    // Prepare query parameters
    const params: Record<string, string> = {};
    if (tagName) {
      params.name = tagName;
      log(`Filtering tags by name: "${tagName}"`);
    } else {
      log('No tag name provided - retrieving all tags');
    }

    // Make API request to search tags
    const response = await mailchimp.lists.tagSearch(listId, params);

    log(`Found ${response.total_items} tags matching your criteria`);

    // Set output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(`Error searching tags: ${error.message}`);
    }
  }
};
