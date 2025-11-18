# List Discussions With Row

Gets a list of all discussions associated with the specified row. Remember that discussions are containers
for the conversation thread. To see the entire thread, use the include=comments parameter.

## Inputs

- **sheetId** (required): (Required) Sheet Id of the sheet being accessed.
- **rowId** (required): (Required) Row Id in the sheet being accessed.
- **include** (optional): A comma-separated list of optional elements to include in the response:
  * **attachments** - effective only if comments is present, otherwise ignored
  * **comments** - include all comments in threads

- **page** (optional): Which page to return. Defaults to 1 if not specified. If you specify a value greater than the total number of pages, the last page of results is returned.
- **pagesize** (optional): The maximum number of items to return per page. Unless otherwise stated for a specific endpoint, defaults to 100. If only page is specified, defaults to a page size of 100. For reports, the default is 100 rows. If you need larger sets of data from your report, returns a maximum of 10,000 rows per request.
- **includeall** (optional): If true, include all results, that is, do not paginate. Mutually exclusive with page and pageSize (they are ignored if includeAll=true is specified).
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
