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
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const { formId, language, translationJson, outputVariable } = inputs;

  // Validate required inputs
  if (!formId) {
    throw new Error('Form ID is required');
  }

  if (!language) {
    throw new Error('Language is required');
  }

  // Parse the translation JSON if it's a string
  let translationData;
  try {
    // If translationJson is already an object, use it directly
    // Otherwise, parse it as JSON
    translationData =
      typeof translationJson === 'string'
        ? JSON.parse(translationJson)
        : translationJson;
  } catch (error) {
    throw new Error(
      `Invalid JSON format for translation data: ${(error as Error).message}`,
    );
  }

  log(`Updating translation for form "${formId}" in language "${language}"`);

  try {
    // Make the API request to update the form translation
    const response = await fetch(
      `https://api.typeform.com/forms/${formId}/translations/${language}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(translationData),
      },
    );

    if (!response.ok) {
      // Handle error responses
      let errorMessage = `Failed to update translation: ${response.status} ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = `${errorMessage}. ${errorData.description || JSON.stringify(errorData)}`;
      } catch (e) {
        // If we can't parse the error response, just use the status
      }

      log(errorMessage);
      setOutput(outputVariable, { success: false, error: errorMessage });
      throw new Error(errorMessage);
    }

    // Success - Typeform returns 204 No Content for successful updates
    log(
      `Successfully updated translation for form "${formId}" in language "${language}"`,
    );
    setOutput(outputVariable, { success: true });
  } catch (error) {
    const errorMessage = `Error updating form translation: ${(error as Error).message}`;
    log(errorMessage);
    setOutput(outputVariable, { success: false, error: errorMessage });
    throw error;
  }
};
