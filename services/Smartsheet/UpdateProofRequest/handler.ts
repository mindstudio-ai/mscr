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
  const { sheetId, proofRequestId, message, outputVariable } = inputs;

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
  log(`Updating proof request ${proofRequestId}`);

  try {
    const updateBody: any = {};
    if (message) {
      updateBody.message = message;
    }

    const response = await client.sheets.updateProofRequest({
      sheetId,
      proofRequestId,
      body: updateBody,
    });
    log('Proof request updated successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to update proof request: ${error.message}`);
  }
};
