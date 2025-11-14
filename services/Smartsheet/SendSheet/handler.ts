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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
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

    const response = await client.sheets.sendSheet({
      sheetId,
      body: sendBody,
    });
    log('Sheet sent successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to send sheet: ${error.message}`);
  }
};
