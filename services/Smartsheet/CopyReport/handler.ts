import smartsheet from 'smartsheet';
import { CopyReportInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CopyReportInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { reportId, newName, destinationFolderId, outputVariable } = inputs;

  if (!reportId) {
    throw new Error('Report ID is required');
  }
  if (!newName) {
    throw new Error('New report name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Copying report ${reportId} to ${newName}`);

  try {
    const copyBody: any = {
      destinationType: destinationFolderId ? 'folder' : 'home',
      newName,
    };
    if (destinationFolderId) {
      copyBody.destinationId = parseInt(destinationFolderId, 10);
    }

    const response = await client.reports.copyReport({
      reportId,
      body: copyBody,
    });
    log('Report copied successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to copy report: ${error.message}`);
  }
};
