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
  const { userId, email, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!email) {
    throw new Error('Email address is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });

  log(`Adding alternate email ${email} for user: ${userId}`);

  try {
    const response = await client.users.addAlternateEmail({
      userId,
      email,
    });

    log(`Successfully added alternate email with ID: ${response.result.id}`);

    setOutput(outputVariable, response.result);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(`User not found: ${userId}`);
    } else if (error.statusCode === 403) {
      throw new Error(
        'Permission denied. You must be a system administrator to add alternate emails.',
      );
    } else if (error.statusCode === 400) {
      throw new Error(`Invalid email address: ${errorMessage}`);
    } else {
      throw new Error(`Failed to add alternate email: ${errorMessage}`);
    }
  }
};
