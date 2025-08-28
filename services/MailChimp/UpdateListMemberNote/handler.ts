import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

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

  // Extract inputs
  const { listId, subscriberHash, noteId, noteContent, outputVariable } =
    inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required.');
  }

  if (!subscriberHash) {
    throw new Error('Subscriber Hash or Email is required.');
  }

  if (!noteId) {
    throw new Error('Note ID is required.');
  }

  if (!noteContent) {
    throw new Error('Note Content is required.');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  // If an email is provided instead of a hash, convert it to MD5 hash
  let subscriberIdentifier = subscriberHash;
  if (subscriberHash.includes('@')) {
    log('Converting email to MD5 hash...');
    subscriberIdentifier = crypto
      .createHash('md5')
      .update(subscriberHash.toLowerCase())
      .digest('hex');
  }

  try {
    log(`Updating note ${noteId} for list member in list ${listId}...`);

    // Update the list member note
    const response = await mailchimp.lists.updateListMemberNote(
      listId,
      subscriberIdentifier,
      noteId,
      {
        note: noteContent,
      },
    );

    log('Note updated successfully!');

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle errors and provide helpful messages
    if (error.response && error.response.body) {
      const { status, detail } = error.response.body;

      if (status === 404) {
        throw new Error(
          `Resource not found: ${detail}. Please verify your List ID, Subscriber Hash/Email, and Note ID.`,
        );
      } else if (status === 401) {
        throw new Error(
          'Authentication error. Please check your API Key and Server Prefix.',
        );
      } else {
        throw new Error(`Mailchimp API error (${status}): ${detail}`);
      }
    } else {
      throw new Error(`Error updating list member note: ${error.message}`);
    }
  }
};
