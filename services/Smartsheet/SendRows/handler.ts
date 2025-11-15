import smartsheet from 'smartsheet';
import { SendRowsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: SendRowsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, rowIds, recipientEmails, subject, message, outputVariable } =
    inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowIds) {
    throw new Error('Row IDs are required');
  }
  if (!recipientEmails) {
    throw new Error('Recipient emails are required');
  }
  if (!subject) {
    throw new Error('Subject is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Sending rows via email');

  try {
    const rowIdArray = rowIds
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10));
    const emails = recipientEmails.split(',').map((e: string) => e.trim());
    const recipients = emails.map((email: string) => ({ email }));

    const sendBody: any = {
      rowIds: rowIdArray,
      to: recipients,
      subject,
    };
    if (message) {
      sendBody.message = message;
    }

    const response = await client.sheets.sendRows({
      sheetId,
      body: sendBody,
    });
    log('Rows sent successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to send rows: ${error.message}`);
  }
};
