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
  const { sheetId, updateRequestId, subject, message, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!updateRequestId) {
    throw new Error('Update Request ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Updating update request ${updateRequestId}`);

  try {
    const updateBody: any = {};
    if (subject) {
      updateBody.subject = subject;
    }
    if (message) {
      updateBody.message = message;
    }

    const response = await client.sheets.updateUpdateRequest({
      sheetId,
      updateRequestId,
      body: updateBody,
    });
    log('Update request updated successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to update update request: ${error.message}`);
  }
};
