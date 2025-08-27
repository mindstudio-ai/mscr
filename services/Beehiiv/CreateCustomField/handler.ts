import { BeehiivClient, Beehiiv } from 'beehiiv';

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
  const { publicationId, fieldType, displayName, outputVariable } = inputs;

  // Validate required environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please check your connector configuration.',
    );
  }

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required.');
  }

  if (!fieldType) {
    throw new Error('Field Type is required.');
  }

  if (!displayName) {
    throw new Error('Display Name is required.');
  }

  // Initialize the Beehiiv client
  log('Initializing Beehiiv client...');
  const client = new BeehiivClient({ token: apiKey });

  try {
    // Create the custom field
    log(
      `Creating custom field "${displayName}" of type "${fieldType}" for publication ${publicationId}...`,
    );

    // Map the fieldType to the expected enum value
    const kind = fieldType as Beehiiv.CustomFieldsCreateRequestKind;

    // Make the API request
    const response = await client.customFields.create(publicationId, {
      kind,
      display: displayName,
    });

    // Check if the response contains data
    if (!response || !response.data) {
      throw new Error(
        'Failed to create custom field. Empty response received.',
      );
    }

    log(`Custom field created successfully with ID: ${response.data.id}`);

    // Set the output variable
    setOutput(outputVariable, response.data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      // Check for common errors
      if (error.message.includes('404')) {
        throw new Error(
          `Publication with ID "${publicationId}" not found. Please check your Publication ID.`,
        );
      } else if (error.message.includes('429')) {
        throw new Error('Too many requests. Please try again later.');
      } else if (error.message.includes('400')) {
        throw new Error(
          `Invalid request: ${error.message}. Please check your field type and display name.`,
        );
      } else {
        throw new Error(`Failed to create custom field: ${error.message}`);
      }
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }
};
