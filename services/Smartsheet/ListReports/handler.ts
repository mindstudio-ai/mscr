import smartsheet from 'smartsheet';
import { ListReportsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListReportsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { outputVariable } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Listing all reports');

  try {
    const response = await client.reports.listReports();
    log(`Found ${response.totalCount || 0} report(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      reports: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list reports: ${error.message}`);
  }
};
