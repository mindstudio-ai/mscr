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
  const { parentType, parentId, name, outputVariable } = inputs;

  if (!parentType) {
    throw new Error('Parent type is required');
  }
  if (!parentId) {
    throw new Error('Parent ID is required');
  }
  if (!name) {
    throw new Error('Folder name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Creating folder ${name} in ${parentType} ${parentId}`);

  try {
    let response;
    if (parentType.toLowerCase() === 'workspace') {
      response = await client.workspaces.createFolder({
        workspaceId: parentId,
        body: { name },
      });
    } else {
      response = await client.folders.createFolder({
        folderId: parentId,
        body: { name },
      });
    }
    log('Folder created successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to create folder: ${error.message}`);
  }
};
