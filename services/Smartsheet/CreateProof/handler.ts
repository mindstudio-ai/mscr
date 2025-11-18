import { CreateProofInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<CreateProofInputs>) => {
  const { sheetId, rowId, filePath, fileName, outputVariable } = inputs;
  if (!sheetId) {
    throw new Error('sheetId is required');
  }
  if (!rowId) {
    throw new Error('rowId is required');
  }
  if (!filePath) {
    throw new Error('filePath is required');
  }
  const path = `/sheets/${sheetId}/rows/${rowId}/proofs`;

  const requestOptions: Record<string, any> = {
    method: 'POST',
    path,
  };
  requestOptions.multipart = true;
  requestOptions.filePath = filePath;
  if (fileName) {
    requestOptions.fileName = fileName;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
