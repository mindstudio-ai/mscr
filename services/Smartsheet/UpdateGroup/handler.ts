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
  const { groupId, name, description, outputVariable } = inputs;

  if (!groupId) {
    throw new Error('Group ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Updating group ${groupId}`);

  try {
    const updateBody: any = {};
    if (name) {
      updateBody.name = name;
    }
    if (description !== undefined) {
      updateBody.description = description;
    }

    const response = await client.groups.updateGroup({
      groupId,
      body: updateBody,
    });
    log('Group updated successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to update group: ${error.message}`);
  }
};
