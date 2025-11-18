import { AddColumnInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<AddColumnInputs>) => {
  const {
    sheetId,
    columnTitle,
    columnType,
    picklistOptions,
    insertPosition,
    siblingColumnIndex,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  if (!columnTitle) {
    throw new Error('Column title is required');
  }

  if (!columnType) {
    throw new Error('Column type is required');
  }

  log(`Adding column "${columnTitle}" to sheet ${sheetId}`);

  try {
    // Build column object
    const columnSpec: any = {
      title: columnTitle,
      type: columnType,
    };

    // Add picklist options if type is PICKLIST
    if (columnType === 'PICKLIST' && picklistOptions) {
      let optionsArray: string[];

      if (typeof picklistOptions === 'string') {
        // Try to parse as JSON first
        try {
          optionsArray = JSON.parse(picklistOptions);
        } catch {
          // If not JSON, split by comma
          optionsArray = picklistOptions
            .split(',')
            .map((opt: string) => opt.trim())
            .filter((opt: string) => opt.length > 0);
        }
      } else if (Array.isArray(picklistOptions)) {
        optionsArray = picklistOptions;
      } else {
        throw new Error(
          'Picklist options must be a comma-separated string or array',
        );
      }

      columnSpec.options = optionsArray;
      log(`Added ${optionsArray.length} picklist options`);
    }

    // Add position if specified
    if (insertPosition && insertPosition !== 'end') {
      if (insertPosition === 'beginning') {
        columnSpec.index = 0;
      } else if (
        (insertPosition === 'before' || insertPosition === 'after') &&
        siblingColumnIndex !== undefined &&
        siblingColumnIndex !== ''
      ) {
        const index = parseInt(siblingColumnIndex, 10);
        if (isNaN(index)) {
          throw new Error('Sibling column index must be a valid number');
        }
        columnSpec.index = insertPosition === 'before' ? index : index + 1;
      }
    }

    // Add column to sheet
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/columns`,
      body: columnSpec,
    });

    log(`Successfully added column with ID: ${(response as any).id}`);

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(
        `Sheet not found: ${sheetId}. Please check the ID and your access permissions.`,
      );
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error(
        `Permission denied. You must have editor or admin access to add columns to this sheet.`,
      );
    } else if (
      errorMessage.includes('400') ||
      errorMessage.includes('Invalid')
    ) {
      throw new Error(
        `Invalid column configuration: ${errorMessage}. Check your column type and options.`,
      );
    } else {
      throw new Error(`Failed to add column: ${errorMessage}`);
    }
  }
};
