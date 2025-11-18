import { ShareSheetInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ShareSheetInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sheetId,
    email,
    accessLevel,
    message,
    sendEmail,
    accessApiLevel,
    outputVariable,
  } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!email) {
    throw new Error('Email address is required');
  }
  if (!accessLevel) {
    throw new Error('Access level is required');
  }

  log(`Sharing sheet ${sheetId} with ${email}`);

  try {
    const queryParams: Record<string, boolean | number> = {};
    if (sendEmail !== undefined) {
      queryParams.sendEmail = sendEmail;
    }
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    const shareBody: any = {
      email,
      accessLevel: accessLevel.toUpperCase(),
    };
    if (message) {
      shareBody.message = message;
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/shares`,
      queryParams,
      body: shareBody,
    });
    log('Sheet shared successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to share sheet: ${error.message}`);
  }
};
