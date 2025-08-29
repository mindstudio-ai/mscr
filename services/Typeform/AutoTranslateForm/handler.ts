export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Typeform API token. Please check your connection settings.',
    );
  }

  const { formId, language, outputVariable } = inputs;

  if (!formId) {
    throw new Error('Form ID is required.');
  }

  if (!language) {
    throw new Error('Target language is required.');
  }

  // Log the start of the translation process
  log(`Starting auto-translation of form ${formId} to ${language}...`);

  try {
    // Make the API request to auto-translate the form
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/translations/${language}/auto`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();

      // Handle 404 error specifically
      if (response.status === 404) {
        throw new Error(
          `Form ID '${formId}' not found. Please check your Form ID and try again.`,
        );
      }

      // Handle other errors
      const errorMessage =
        errorData.description || 'An error occurred while translating the form';
      throw new Error(
        `Typeform API Error (${response.status}): ${errorMessage}`,
      );
    }

    // Parse the response
    const translationResult = (await response.json()) as any;

    log(`Successfully translated form to ${language}.`);

    // Set the output variable with the translation result
    setOutput(outputVariable, translationResult);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unexpected error occurred during form translation.');
  }
};
