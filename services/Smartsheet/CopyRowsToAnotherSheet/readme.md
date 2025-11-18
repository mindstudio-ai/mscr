# Copy Rows To Another Sheet

Copies rows from the sheet specified in the URL to (the bottom of) another sheet.

## Inputs

- **sheetId** (required): (Required) Sheet Id of the sheet being accessed.
- **include** (optional): A comma-separated list of row elements to copy in addition to the cell data:
  * **all** - specify a value of **all** to include everything (attachments,
children, and discussions).
  * **attachments**
  * **children** -  if specified, any child rows of the rows specified in
the request are also copied to the destination sheet, and parent-child relationships amongst rows are preserved within the destination sheet; if not specified, only the rows specified in the request are copied.
  * **discussions**

- **ignorerowsnotfound** (optional): **true** or **false**: default is **false**. If set to **true**, specifying row Ids that do not exist within the source sheet does not cause an error response. If omitted or set to **false**, specifying row Ids that do not exist within the source sheet causes an error response (and no rows are copied).

- **rowids** (optional): Body property
- **toSheetid** (optional): Body property
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
