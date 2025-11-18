import { CreateFolderInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CreateFolderInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { folderId, name, include, exclude, skipRemap, outputVariable } =
    inputs;

  if (!folderId) {
    throw new Error('Folder ID (parent folder) is required');
  }
  if (!name) {
    throw new Error('Folder name is required');
  }

  log(`Creating folder ${name} in folder ${folderId}`);

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

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/folders/${folderId}/folders`,
      queryParams,
      body: { name },
    });

    log('Folder created successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to create folder: ${error.message}`);
  }
};
