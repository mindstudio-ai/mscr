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

  // Get access token from environment
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  // Initialize Smartsheet client
  const client = smartsheet.createClient({ accessToken });

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
    const response = await client.sheets.addColumn({
      sheetId,
      body: columnSpec,
    });

    log(`Successfully added column with ID: ${response.result.id}`);

    // Set output variable
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(
        `Sheet not found: ${sheetId}. Please check the ID and your access permissions.`,
      );
    } else if (error.statusCode === 403) {
      throw new Error(
        `Permission denied. You must have editor or admin access to add columns to this sheet.`,
      );
    } else if (error.statusCode === 400) {
      throw new Error(
        `Invalid column configuration: ${errorMessage}. Check your column type and options.`,
      );
    } else {
      throw new Error(`Failed to add column: ${errorMessage}`);
    }
  }
};
