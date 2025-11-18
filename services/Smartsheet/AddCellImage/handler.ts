import { AddCellImageInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<AddCellImageInputs>) => {
  const {
    sheetId,
    rowId,
    columnId,
    imageId,
    altText,
    overrideValidation,
    outputVariable,
  } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
  }
  if (!columnId) {
    throw new Error('Column ID is required');
  }
  if (!imageId) {
    throw new Error('Image ID is required');
  }

  log(`Adding image ${imageId} to cell`);

  try {
    const queryParams: Record<string, string | boolean> = {};
    if (altText) {
      queryParams.altText = altText;
    }
    if (overrideValidation !== undefined) {
      queryParams.overrideValidation = overrideValidation;
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/rows/${rowId}/columns/${columnId}/images`,
      queryParams,
      body: { imageId },
    });
    log('Successfully added image to cell');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to add cell image: ${error.message}`);
  }
};
