# Move Rows To Another Sheet

Moves rows from the sheet specified in the URL to (the bottom of) another sheet.

## Inputs

- **sheetId** (required): (Required) Sheet Id of the sheet being accessed.
- **include** (optional): A comma-separate list of row elements to move in addition to the cell data.

- **ignorerowsnotfound** (optional): **true** or **false**: default is **false**. If set to **true**, specifying row Ids that do not exist within the source sheet does not cause an error response. If omitted or set to **false**, specifying row Ids that do not exist within the source sheet causes an error response (and no rows are moved).

- **rowids** (optional): Body property
- **toSheetid** (optional): Body property
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
