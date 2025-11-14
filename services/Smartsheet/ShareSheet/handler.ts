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
  const { sheetId, email, accessLevel, message, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!email) {
    throw new Error('Email address is required');
  }
  if (!accessLevel) {
    throw new Error('Access level is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Sharing sheet ${sheetId} with ${email}`);

  try {
    const shareBody: any = {
      email,
      accessLevel: accessLevel.toUpperCase(),
    };
    if (message) {
      shareBody.message = message;
    }

    const response = await client.sheets.share({
      sheetId,
      body: shareBody,
    });
    log('Sheet shared successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to share sheet: ${error.message}`);
  }
};
