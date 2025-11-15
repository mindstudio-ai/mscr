import smartsheet from 'smartsheet';
import { ListProofsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListProofsInputs;
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
  log(`Listing proofs for sheet ${sheetId}`);

  try {
    const response = await client.sheets.listProofRequests({ sheetId });
    const proofs = response.data || [];
    log(`Found ${proofs.length} proof request(s)`);
    setOutput(outputVariable, {
      totalCount: proofs.length,
      proofs,
    });
  } catch (error: any) {
    throw new Error(`Failed to list proofs: ${error.message}`);
  }
};
