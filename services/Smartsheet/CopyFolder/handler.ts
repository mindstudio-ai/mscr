import { CopyFolderInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CopyFolderInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    folderId,
    destinationType,
    destinationId,
    newName,
    include,
    exclude,
    skipRemap,
    outputVariable,
  } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }
  if (!destinationType) {
    throw new Error('Destination type is required');
  }
  if (!newName) {
    throw new Error('New name is required');
  }

  log(`Copying folder ${folderId} to ${destinationType}`);

  try {
    const queryParams: Record<string, string> = {};
    if (include) {
      queryParams.include = include;
    }
    if (exclude) {
      queryParams.exclude = exclude;
    }
    if (skipRemap) {
      queryParams.skipRemap = skipRemap;
    }

    const copyBody: any = {
      destinationType: destinationType.toLowerCase(),
      newName,
    };
    if (destinationId && destinationType.toLowerCase() !== 'home') {
      copyBody.destinationId = parseInt(destinationId, 10);
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/folders/${folderId}/copy`,
      queryParams,
      body: copyBody,
    });
    log('Folder copied successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to copy folder: ${error.message}`);
  }
};
