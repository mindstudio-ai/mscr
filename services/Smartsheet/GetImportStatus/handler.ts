import smartsheet from 'smartsheet';
import { GetImportStatusInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetImportStatusInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { jobId, outputVariable } = inputs;

  if (!jobId) {
    throw new Error('Job ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting import status for job ${jobId}`);

  try {
    const response = await client.sheets.getImportStatus({ jobId });
    log(`Import status: ${response.status}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get import status: ${error.message}`);
  }
};
