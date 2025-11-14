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
  const { sheetId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });

  log(`Listing attachments for sheet: ${sheetId}`);

  try {
    const response = await client.sheets.listAttachments({ sheetId });

    log(`Successfully retrieved ${response.data?.length || 0} attachment(s)`);

    setOutput(outputVariable, {
      totalCount: response.totalCount,
      attachments: response.data,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(`Sheet not found: ${sheetId}`);
    } else if (error.statusCode === 403) {
      throw new Error('Permission denied');
    } else {
      throw new Error(`Failed to list attachments: ${errorMessage}`);
    }
  }
};
