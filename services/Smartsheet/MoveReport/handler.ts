import smartsheet from 'smartsheet';
import { MoveReportInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: MoveReportInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { reportId, destinationType, destinationId, outputVariable } = inputs;

  if (!reportId) {
    throw new Error('Report ID is required');
  }
  if (!destinationType) {
    throw new Error('Destination type is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Moving report ${reportId} to ${destinationType}`);

  try {
    const moveBody: any = {
      destinationType: destinationType.toLowerCase(),
    };
    if (destinationId && destinationType.toLowerCase() !== 'home') {
      moveBody.destinationId = parseInt(destinationId, 10);
    }

    const response = await client.reports.moveReport({
      reportId,
      body: moveBody,
    });
    log('Report moved successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to move report: ${error.message}`);
  }
};
