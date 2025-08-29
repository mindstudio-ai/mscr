import fetch from 'node-fetch';

export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract inputs
  const { formId, confirmDeletion } = inputs;

  // Validate required environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  // Check for confirmation
  if (confirmDeletion !== 'yes') {
    log('Form deletion cancelled. You selected not to delete the form.');
    return { success: false };
  }

  try {
    log(`Preparing to delete form with ID: ${formId}`);

    // Make the API request to delete the form
    const response = await fetch(`https://api.typeform.com/forms/${formId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle response
    if (response.ok) {
      log(
        `Form ${formId} has been successfully deleted along with all its responses.`,
      );
      return { success: true };
    } else {
      // Handle error responses
      const statusCode = response.status;

      if (statusCode === 401) {
        throw new Error('Authentication failed. Please check your API token.');
      } else if (statusCode === 403) {
        throw new Error('You do not have permission to delete this form.');
      } else if (statusCode === 404) {
        throw new Error(
          `Form with ID ${formId} not found. Please check the form ID.`,
        );
      } else {
        throw new Error(
          `Failed to delete form. Server responded with status code: ${statusCode}`,
        );
      }
    }
  } catch (error) {
    // Handle network or other errors
    log(`Error deleting form: ${error.message}`);
    throw error;
  }
};
