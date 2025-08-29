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

  const { accountId, jobId, outputVariable } = inputs;

  if (!accountId) {
    throw new Error('Account ID is required');
  }

  if (!jobId) {
    throw new Error('Job ID is required');
  }

  log(`Checking status of RTBF job ${jobId} for account ${accountId}...`);

  try {
    // Note: This endpoint is deprecated according to Typeform documentation
    log(
      'Note: This endpoint is deprecated by Typeform and may not be supported in the future.',
    );

    const response = await fetch(
      `https://api.typeform.com/rtbf/${accountId}/job/${jobId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your token.');
      } else if (response.status === 403) {
        throw new Error('You do not have permission to access this resource.');
      } else if (response.status === 404) {
        throw new Error(
          `Job not found. Please verify the Account ID and Job ID.`,
        );
      } else {
        throw new Error(
          `API request failed with status ${response.status}: ${response.statusText}`,
        );
      }
    }

    const data = (await response.json()) as {
      accountID: string;
      status: string;
      token: string;
    };

    log(`Job status retrieved successfully: ${data.status}`);

    // Set the full response as the output
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error retrieving job status: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving the job status',
    );
  }
};
