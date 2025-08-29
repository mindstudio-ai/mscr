export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs and environment variables
  const { formId, outputVariable } = inputs;
  const { token } = process.env;

  // Validate required inputs
  if (!formId) {
    throw new Error('Form ID is required');
  }

  if (!token) {
    throw new Error('Authentication token is missing');
  }

  // Construct the API URL
  const apiUrl = `https://api.typeform.com/insights/${formId}/summary`;

  log(`Retrieving form insights for form: ${formId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();

      // Provide helpful error messages based on status code
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Typeform token.',
        );
      } else if (response.status === 403) {
        throw new Error(
          "You don't have permission to access this form's insights.",
        );
      } else if (response.status === 404) {
        throw new Error(
          `Form with ID "${formId}" not found. Please check your Form ID.`,
        );
      } else {
        throw new Error(
          `Typeform API error (${response.status}): ${errorText}`,
        );
      }
    }

    // Parse the response
    const formInsights = (await response.json()) as any;

    log('Successfully retrieved form insights');

    // Provide a summary of the insights in the logs
    if (formInsights.form && formInsights.form.summary) {
      const summary = formInsights.form.summary;
      log(
        `Form summary: ${summary.responses_count} responses, ${summary.completion_rate.toFixed(1)}% completion rate`,
      );
    }

    // Set the output variable with the complete insights data
    setOutput(outputVariable, formInsights);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error retrieving form insights: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving form insights');
  }
};
