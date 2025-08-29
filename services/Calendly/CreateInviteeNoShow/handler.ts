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
    throw new Error('Missing authentication token');
  }

  const { inviteeUuid, outputVariable } = inputs;
  if (!inviteeUuid) {
    throw new Error('Missing invitee UUID');
  }

  log(`Marking invitee ${inviteeUuid} as a no-show in Calendly`);

  try {
    // Construct the invitee URL in the format required by Calendly API
    const inviteeUrl = `https://api.calendly.com/scheduled_events/invitees/${inviteeUuid}`;

    // Make the API request to mark the invitee as a no-show
    const response = await fetch('https://api.calendly.com/invitee_no_shows', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invitee: inviteeUrl,
      }),
    });

    // Parse the response
    const responseData = (await response.json()) as any;

    // Check if the request was successful
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      log(`Error marking invitee as no-show: ${errorMessage}`);
      throw new Error(`Failed to mark invitee as no-show: ${errorMessage}`);
    }

    log('Successfully marked invitee as no-show');

    // Set the output variable with the response data
    setOutput(outputVariable, responseData);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
