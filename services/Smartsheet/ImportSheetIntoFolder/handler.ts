import { ImportSheetIntoFolderInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ImportSheetIntoFolderInputs>) => {
  const {
    folderId,
    sheetname,
    headerrowindex,
    primarycolumnindex,
    filePath,
    fileName,
    outputVariable,
  } = inputs;
  if (!folderId) {
    throw new Error('folderId is required');
  }
  if (!filePath) {
    throw new Error('filePath is required');
  }
  const path = `/folders/${folderId}/sheets/import`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (sheetname !== undefined && sheetname !== null) {
    queryParams['sheetName'] = sheetname;
  }
  if (headerrowindex !== undefined && headerrowindex !== null) {
    queryParams['headerRowIndex'] = headerrowindex;
  }
  if (primarycolumnindex !== undefined && primarycolumnindex !== null) {
    queryParams['primaryColumnIndex'] = primarycolumnindex;
  }

  const requestOptions: Record<string, any> = {
    method: 'POST',
    path,
  };
  if (Object.keys(queryParams).length > 0) {
    requestOptions.queryParams = queryParams;
  }
  requestOptions.multipart = true;
  requestOptions.filePath = filePath;
  if (fileName) {
    requestOptions.fileName = fileName;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
