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
  const { contactId, outputVariable } = inputs;

  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting contact ${contactId}`);

  try {
    const response = await client.contacts.getContact({ contactId });
    log('Retrieved contact successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get contact: ${error.message}`);
  }
};
