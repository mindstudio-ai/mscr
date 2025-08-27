import * as mailchimp from '@mailchimp/mailchimp_marketing';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing Mailchimp API Key. Please check your configuration.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Mailchimp Server Prefix. Please check your configuration.',
    );
  }

  // Extract inputs
  const { listId, segmentId, name, matchType, outputVariable } = inputs;

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required.');
  }

  if (!segmentId) {
    throw new Error('Segment ID is required.');
  }

  if (!name) {
    throw new Error('Segment Name is required.');
  }

  // Initialize Mailchimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Updating segment "${name}" in list ${listId}...`);

  try {
    // Prepare the update payload
    const updatePayload: Record<string, any> = {
      name,
    };

    // Add match type if provided
    if (matchType) {
      updatePayload.options = {
        match: matchType,
      };
    }

    // Make the API call to update the segment
    const response = await mailchimp.lists.updateSegment(
      listId,
      segmentId,
      updatePayload,
    );

    log(`Successfully updated segment "${name}"`);

    // Set the output variable with the updated segment information
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error instanceof Error) {
      // For other types of errors
      throw new Error(`Error updating segment: ${error.message}`);
    } else {
      // For unknown error types
      throw new Error('An unknown error occurred while updating the segment');
    }
  }
};
