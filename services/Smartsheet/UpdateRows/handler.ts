import { UpdateRowsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateRowsInputs>) => {
  const {
    sheetId,
    rowsData,
    accessApiLevel,
    allowPartialSuccess,
    overrideValidation,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  if (!rowsData) {
    throw new Error('Rows data is required');
  }

  log(`Updating rows in sheet: ${sheetId}`);

  try {
    // Build query parameters
    const queryParams: Record<string, number | boolean> = {};
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }
    if (allowPartialSuccess !== undefined) {
      queryParams.allowPartialSuccess = allowPartialSuccess;
    }
    if (overrideValidation !== undefined) {
      queryParams.overrideValidation = overrideValidation;
    }

    // Parse rows data
    let rowsArray =
      typeof rowsData === 'string' ? JSON.parse(rowsData) : rowsData;

    if (!Array.isArray(rowsArray)) {
      // If single row object provided, wrap in array
      rowsArray = [rowsArray];
    }

    // Validate that each row has an id
    for (const row of rowsArray) {
      if (!row.id) {
        throw new Error('Each row must have an "id" property');
      }
    }

    log(`Updating ${rowsArray.length} row(s)`);

    // Update rows in sheet
    const response = await smartsheetApiRequest<{ id: number }[]>({
      method: 'PUT',
      path: `/sheets/${sheetId}/rows`,
      queryParams,
      body: rowsArray,
    });

    const resultArray = Array.isArray(response) ? response : [response];
    log(`Successfully updated ${resultArray.length} row(s)`);

    // Set output variable
    setOutput(outputVariable, {
      updatedRows: resultArray,
      count: resultArray.length,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(
        `Sheet or row not found. Please check the sheet ID and row IDs.`,
      );
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error(
        `Permission denied. You must have editor access to update rows in this sheet.`,
      );
    } else if (
      errorMessage.includes('400') ||
      errorMessage.includes('Invalid')
    ) {
      throw new Error(
        `Invalid row data: ${errorMessage}. Check your row IDs, column IDs, and values.`,
      );
    } else {
      throw new Error(`Failed to update rows: ${errorMessage}`);
    }
  }
};
