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
      'Missing authentication token. Please check your Calendly connection.',
    );
  }

  const { submissionUuid, outputVariable } = inputs;
  if (!submissionUuid) {
    throw new Error(
      'Missing submission UUID. Please provide a valid submission identifier.',
    );
  }

  log(`Retrieving routing form submission with UUID: ${submissionUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/routing_form_submissions/${submissionUuid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `Submission not found. Please check the UUID: ${submissionUuid}`,
        );
      } else if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly connection.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        const errorText = await response.text();
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved routing form submission data');

    // Store the complete submission data in the output variable
    setOutput(outputVariable, data.resource);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
