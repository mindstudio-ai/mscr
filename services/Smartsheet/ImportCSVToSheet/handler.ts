import { ImportCSVToSheetInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ImportCSVToSheetInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    fileUrl,
    sheetName,
    headerRowIndex,
    primaryColumnIndex,
    outputVariable,
  } = inputs;

  if (!fileUrl) {
    throw new Error('File URL is required');
  }
  if (!sheetName) {
    throw new Error('Sheet name is required');
  }

  log(`Importing CSV file: ${fileUrl}`);

  try {
    const queryParams: Record<string, string | number> = {
      sheetName,
    };
    if (headerRowIndex !== undefined) {
      queryParams.headerRowIndex = headerRowIndex;
    }
    if (primaryColumnIndex !== undefined) {
      queryParams.primaryColumnIndex = primaryColumnIndex;
    }

    const importBody: any = {
      type: 'csv',
      file: fileUrl,
    };

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: '/sheets/import',
      queryParams,
      body: importBody,
    });
    log('CSV imported successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to import CSV: ${error.message}`);
  }
};
