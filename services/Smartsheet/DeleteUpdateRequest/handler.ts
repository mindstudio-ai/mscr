import smartsheet from 'smartsheet';
import { DeleteUpdateRequestInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteUpdateRequestInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, updateRequestId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!updateRequestId) {
    throw new Error('Update Request ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Deleting update request ${updateRequestId}`);

  try {
    await client.sheets.deleteUpdateRequest({ sheetId, updateRequestId });
    log('Update request deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedUpdateRequestId: updateRequestId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete update request: ${error.message}`);
  }
};
