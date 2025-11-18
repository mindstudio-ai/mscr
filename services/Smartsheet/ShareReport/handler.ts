import { ShareReportInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ShareReportInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { reportId, email, accessLevel, sendEmail, outputVariable } = inputs;

  if (!reportId) {
    throw new Error('Report ID is required');
  }
  if (!email) {
    throw new Error('Email address is required');
  }
  if (!accessLevel) {
    throw new Error('Access level is required');
  }

  log(`Sharing report ${reportId} with ${email}`);

  try {
    const queryParams: Record<string, boolean> = {};
    if (sendEmail !== undefined) {
      queryParams.sendEmail = sendEmail;
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/reports/${reportId}/shares`,
      queryParams,
      body: {
        email,
        accessLevel: accessLevel.toUpperCase(),
      },
    });
    log('Report shared successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to share report: ${error.message}`);
  }
};
