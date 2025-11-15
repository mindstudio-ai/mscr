import smartsheet from 'smartsheet';
import { GetReportInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetReportInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { reportId, outputVariable } = inputs;

  if (!reportId) {
    throw new Error('Report ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting report ${reportId}`);

  try {
    const response = await client.reports.getReport({ reportId });
    log('Retrieved report successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get report: ${error.message}`);
  }
};
