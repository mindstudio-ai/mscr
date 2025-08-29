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
    throw new Error('Missing authentication token');
  }

  const { emails, accountId, outputVariable } = inputs;

  if (!emails) {
    throw new Error('Missing email addresses');
  }

  if (!accountId) {
    throw new Error('Missing account ID');
  }

  // Parse the multiline email input into an array
  const emailArray = emails
    .split('\n')
    .map((email) => email.trim())
    .filter((email) => email.length > 0);

  log(
    `Preparing to delete responses containing ${emailArray.length} email addresses`,
  );

  try {
    // Make the DELETE request to the RTBF endpoint
    const response = await fetch(
      `https://api.typeform.com/rtbf/${accountId}/responses`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailArray),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response to get the job IDs
    const jobIds = (await response.json()) as string[];

    log(`Successfully initiated deletion. ${jobIds.length} job(s) created.`);

    // Set the output variable with the job IDs
    setOutput(outputVariable, jobIds);
  } catch (error) {
    log(
      `Error deleting responses: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
