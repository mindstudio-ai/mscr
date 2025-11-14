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
  const { userId, alternateEmailId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!alternateEmailId) {
    throw new Error('Alternate email ID is required');
  }

  const accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Deleting alternate email ${alternateEmailId} for user ${userId}...`);

    const result = await client.users.deleteAlternateEmail({
      userId,
      alternateEmailId,
    });

    log(`Successfully deleted alternate email: ${alternateEmailId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error deleting alternate email: ${error.message}`);
    throw error;
  }
};
