import { SendSheetInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: SendSheetInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, recipientEmails, subject, message, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!recipientEmails) {
    throw new Error('Recipient emails are required');
  }
  if (!subject) {
    throw new Error('Subject is required');
  }

  log('Sending sheet via email');

  try {
    const emails = recipientEmails.split(',').map((e: string) => e.trim());
    const recipients = emails.map((email: string) => ({ email }));

    const sendBody: any = {
      to: recipients,
      subject,
    };
    if (message) {
      sendBody.message = message;
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/emails`,
      body: sendBody,
    });
    log('Sheet sent successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to send sheet: ${error.message}`);
  }
};
