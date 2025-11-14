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
  const { sheetId, rowId, columnId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
  }
  if (!columnId) {
    throw new Error('Column ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting cell history for cell in row ${rowId}, column ${columnId}`);

  try {
    const response = await client.sheets.getCellHistory({
      sheetId,
      rowId,
      columnId,
    });
    log(`Retrieved ${response.data?.length || 0} history item(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      history: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to get cell history: ${error.message}`);
  }
};
