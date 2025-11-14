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
  const { sheetId, updateRequestId, newOwnerEmail, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!updateRequestId) {
    throw new Error('Update Request ID is required');
  }
  if (!newOwnerEmail) {
    throw new Error('New owner email is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(
    `Changing owner of update request ${updateRequestId} to ${newOwnerEmail}`,
  );

  try {
    const response = await client.sheets.changeUpdateRequestOwner({
      sheetId,
      updateRequestId,
      body: { email: newOwnerEmail },
    });
    log('Update request owner changed successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to change update request owner: ${error.message}`);
  }
};
