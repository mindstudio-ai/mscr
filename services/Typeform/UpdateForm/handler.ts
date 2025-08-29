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

  const { formId, formDefinition, outputVariable } = inputs;

  if (!formId) {
    throw new Error('Form ID is required.');
  }

  // Ensure we have a valid form definition
  if (!formDefinition) {
    throw new Error('Form definition is required.');
  }

  // Parse the form definition if it's a string (should be auto-parsed already, but just in case)
  const formData =
    typeof formDefinition === 'string'
      ? JSON.parse(formDefinition)
      : formDefinition;

  log(`Updating Typeform form with ID: ${formId}`);

  try {
    // Make the API request to update the form
    const response = await fetch(`https://api.typeform.com/forms/${formId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update form: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const result = (await response.json()) as any;

    log(`Form updated successfully. Form title: "${result.title}"`);

    // Set the output variable with the API response
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error updating form: ${errorMessage}`);
    throw new Error(`Failed to update Typeform form: ${errorMessage}`);
  }
};
