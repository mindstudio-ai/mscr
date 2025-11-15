import smartsheet from 'smartsheet';
import { DeleteProofRequestInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteProofRequestInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, proofRequestId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!proofRequestId) {
    throw new Error('Proof request ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Deleting proof request ${proofRequestId}`);

  try {
    await client.sheets.deleteProofRequest({ sheetId, proofRequestId });
    log('Proof request deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedProofRequestId: proofRequestId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete proof request: ${error.message}`);
  }
};
