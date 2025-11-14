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
  const { sheetId, fieldIds, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!fieldIds) {
    throw new Error('Field IDs are required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Deleting sheet summary fields');

  try {
    const ids = fieldIds.split(',').map((id: string) => id.trim());
    await client.sheets.deleteSheetSummaryFields({
      sheetId,
      queryParameters: { ids: ids.join(',') },
    });
    log(`Deleted ${ids.length} field(s) successfully`);
    setOutput(outputVariable, {
      success: true,
      deletedCount: ids.length,
      deletedFieldIds: ids,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete sheet summary fields: ${error.message}`);
  }
};
