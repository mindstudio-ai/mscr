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
      'Missing authentication token. Please reconnect your Calendly account.',
    );
  }

  const { scheduleId, outputVariable } = inputs;
  if (!scheduleId) {
    throw new Error('Schedule ID is required');
  }

  log(`Retrieving availability schedule with ID: ${scheduleId}`);

  try {
    // Make API request to Calendly
    const response = await fetch(
      `https://api.calendly.com/user_availability_schedules/${scheduleId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      log(
        `Error retrieving availability schedule: ${response.status} ${response.statusText}`,
      );
      throw new Error(
        `Failed to retrieve availability schedule: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved availability schedule');

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error: any) {
    // Handle any errors that occurred during the API request
    log(`Error: ${error.message}`);
    throw error;
  }
};
