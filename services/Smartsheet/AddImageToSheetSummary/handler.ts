import { AddImageToSheetSummaryInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<AddImageToSheetSummaryInputs>) => {
  const {
    sheetId,
    fieldId,
    alttext,
    overridevalidation,
    filePath,
    fileName,
    outputVariable,
  } = inputs;
  if (!sheetId) {
    throw new Error('sheetId is required');
  }
  if (!fieldId) {
    throw new Error('fieldId is required');
  }
  if (!filePath) {
    throw new Error('filePath is required');
  }
  const path = `/sheets/${sheetId}/summary/fields/${fieldId}/images`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (alttext !== undefined && alttext !== null) {
    queryParams['altText'] = alttext;
  }
  if (overridevalidation !== undefined && overridevalidation !== null) {
    queryParams['overrideValidation'] = overridevalidation;
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
