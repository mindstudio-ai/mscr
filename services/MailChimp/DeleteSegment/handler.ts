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
  const { listId, segmentId, outputMessage } = inputs;

  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!segmentId) {
    throw new Error('Segment ID is required');
  }

  if (!apiKey) {
    throw new Error('MailChimp API Key is missing');
  }

  if (!serverPrefix) {
    throw new Error('MailChimp Server Prefix is missing');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  try {
    // Log the operation
    log(`Deleting segment ${segmentId} from list ${listId}...`);

    // Delete the segment
    await mailchimp.lists.deleteSegment(listId, segmentId);

    // Log success
    log('Segment successfully deleted');

    // Set output
    setOutput(outputMessage, 'Segment successfully deleted');
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    log(`Error deleting segment: ${errorMessage}`);
    throw new Error(`Failed to delete segment: ${errorMessage}`);
  }
};
