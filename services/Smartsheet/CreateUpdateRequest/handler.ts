import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
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

    const response = await client.sheets.createUpdateRequest({
      sheetId,
      body: requestBody,
    });
    log('Update request created successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to create update request: ${error.message}`);
  }
};
