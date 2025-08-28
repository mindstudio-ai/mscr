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

  const {
    listId,
    headerText,
    headerImageUrl,
    imageAlign,
    signupMessage,
    unsubMessage,
    thankYouTitle,
    outputVariable,
  } = inputs;

  if (!listId) {
    throw new Error('List ID is required.');
  }

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log('Preparing to customize signup form...');

  // Build the request payload
  const payload: Record<string, any> = {};

  // Add header customization if provided
  if (headerText || headerImageUrl || imageAlign) {
    payload.header = {};

    if (headerText) {
      payload.header.text = headerText;
    }

    if (headerImageUrl) {
      payload.header.image_url = headerImageUrl;
    }

    if (imageAlign) {
      payload.header.image_align = imageAlign;
    }
  }

  // Add content customization if provided
  if (signupMessage || unsubMessage || thankYouTitle) {
    payload.contents = [];

    if (signupMessage) {
      payload.contents.push({
        section: 'signup_message',
        value: signupMessage,
      });
    }

    if (unsubMessage) {
      payload.contents.push({
        section: 'unsub_message',
        value: unsubMessage,
      });
    }

    if (thankYouTitle) {
      payload.contents.push({
        section: 'signup_thank_you_title',
        value: thankYouTitle,
      });
    }
  }

  try {
    log(`Customizing signup form for list ID: ${listId}...`);

    // Make the API call to customize the signup form
    const response = await mailchimp.lists.updateSignupForm(listId, payload);

    log('Successfully customized signup form!');

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;
      throw new Error(`MailChimp API Error (${status}): ${detail}`);
    } else {
      throw new Error(
        `Error customizing signup form: ${error.message || error}`,
      );
    }
  }
};
