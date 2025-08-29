export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const { formId, responseIds, outputVariable } = inputs;

  if (!formId) {
    throw new Error('Form ID is required');
  }

  if (!responseIds) {
    throw new Error('Response IDs are required');
  }

  log(`Preparing to delete responses from form: ${formId}`);

  // Construct the API URL
  const apiUrl = `https://api.typeform.com/forms/${formId}/responses`;

  try {
    // Make the DELETE request to Typeform API
    const response = await fetch(
      `${apiUrl}?included_response_ids=${encodeURIComponent(responseIds)}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Parse the response
    const responseData = (await response.json()) as any;

    // Handle error responses
    if (!response.ok) {
      const errorMessage = responseData.description || 'Unknown error occurred';
      throw new Error(`Failed to delete responses: ${errorMessage}`);
    }

    log(`Successfully requested deletion of responses`);

    // Set the output variable with the result
    setOutput(outputVariable, {
      success: true,
      message: 'Deletion request successfully registered',
      responseIds: responseIds.split(','),
    });
  } catch (error: any) {
    log(`Error deleting responses: ${error.message}`);
    throw error;
  }
};
