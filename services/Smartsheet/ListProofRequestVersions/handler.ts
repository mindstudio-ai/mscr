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
  log(`Listing versions for proof request ${proofRequestId}`);

  try {
    const response = await client.sheets.listProofRequestVersions({
      sheetId,
      proofRequestId,
    });
    const versions = response.data || [];
    log(`Found ${versions.length} version(s)`);
    setOutput(outputVariable, {
      totalCount: versions.length,
      versions,
    });
  } catch (error: any) {
    throw new Error(`Failed to list proof versions: ${error.message}`);
  }
};
