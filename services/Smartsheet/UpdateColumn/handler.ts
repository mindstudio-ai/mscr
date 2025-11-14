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
  const { sheetId, columnId, title, index, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!columnId) {
    throw new Error('Column ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Updating column ${columnId}`);

  try {
    const updateBody: any = {};
    if (title) {
      updateBody.title = title;
    }
    if (index !== undefined && index !== '') {
      updateBody.index = parseInt(index, 10);
    }

    const response = await client.sheets.updateColumn({
      sheetId,
      columnId,
      body: updateBody,
    });
    log('Successfully updated column');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to update column: ${error.message}`);
  }
};
