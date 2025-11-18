import { CreateUpdateRequestInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<CreateUpdateRequestInputs>) => {
  const {
    sheetId,
    rowIds,
    columnIds,
    recipientEmails,
    subject,
    message,
    outputVariable,
  } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowIds) {
    throw new Error('Row IDs are required');
  }
  if (!columnIds) {
    throw new Error('Column IDs are required');
  }
  if (!recipientEmails) {
    throw new Error('Recipient emails are required');
  }
  if (!subject) {
    throw new Error('Subject is required');
  }

  log('Creating update request');

  try {
    const rows = rowIds.split(',').map((id: string) => parseInt(id.trim(), 10));
    const columns = columnIds
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10));
    const emails = recipientEmails.split(',').map((e: string) => e.trim());
    const recipients = emails.map((email: string) => ({ email }));

    const requestBody: any = {
      rowIds: rows,
      columnIds: columns,
      sendTo: recipients,
      subject,
    };
    if (message) {
      requestBody.message = message;
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/updaterequests`,
      body: requestBody,
    });
    log('Update request created successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to create update request: ${error.message}`);
  }
};
