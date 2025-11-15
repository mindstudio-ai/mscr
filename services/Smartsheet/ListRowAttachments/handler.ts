import smartsheet from 'smartsheet';
import { ListRowAttachmentsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListRowAttachmentsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, rowId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Listing attachments for row ${rowId}`);

  try {
    const response = await client.sheets.rows.getRowAttachments({
      sheetId,
      rowId,
    });
    log(`Found ${response.data?.length || 0} attachment(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      attachments: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list row attachments: ${error.message}`);
  }
};
