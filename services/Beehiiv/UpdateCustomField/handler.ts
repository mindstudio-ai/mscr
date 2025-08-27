import { BeehiivClient } from 'beehiiv';

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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Extract input parameters
  const { publicationId, customFieldId, display, outputVariable } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!customFieldId) {
    throw new Error('Custom Field ID is required');
  }
  if (!display) {
    throw new Error('Display name is required');
  }

  // Initialize the Beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  try {
    // Log the operation
    log(
      `Updating custom field "${customFieldId}" for publication "${publicationId}"`,
    );

    // Call the API to update the custom field
    const response = await client.customFields.patch(
      publicationId,
      customFieldId,
      {
        display,
      },
    );

    // Log success
    log(`Successfully updated custom field to "${display}"`);

    // Set the output variable with the response data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle errors
    const errorMessage = error.message || 'An unknown error occurred';
    log(`Error updating custom field: ${errorMessage}`);
    throw new Error(`Failed to update custom field: ${errorMessage}`);
  }
};
