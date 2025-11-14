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
  const { sheetId, rowIds, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowIds) {
    throw new Error('Row IDs are required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Deleting rows');

  try {
    const ids = rowIds.split(',').map((id: string) => id.trim());
    await client.sheets.deleteRows({
      sheetId,
      queryParameters: { ids: ids.join(',') },
    });
    log(`Deleted ${ids.length} row(s) successfully`);
    setOutput(outputVariable, {
      success: true,
      deletedCount: ids.length,
      deletedRowIds: ids,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete rows: ${error.message}`);
  }
};
