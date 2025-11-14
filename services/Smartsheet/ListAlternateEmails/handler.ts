import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { userId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });

  log(`Retrieving alternate emails for user: ${userId}`);

  try {
    const response = await client.users.listAlternateEmails({ userId });

    log(
      `Successfully retrieved ${response.data?.length || 0} alternate email(s)`,
    );

    setOutput(outputVariable, {
      totalCount: response.totalCount,
      alternateEmails: response.data,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(`User not found: ${userId}`);
    } else if (error.statusCode === 403) {
      throw new Error(
        'Permission denied. You must be a system administrator to view alternate emails.',
      );
    } else {
      throw new Error(`Failed to list alternate emails: ${errorMessage}`);
    }
  }
};
