import { SendRowsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SendRowsInputs>) => {
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

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/rows/emails`,
      body: sendBody,
    });
    log('Rows sent successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to send rows: ${error.message}`);
  }
};
