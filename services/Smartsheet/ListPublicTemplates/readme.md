# List Public Templates

Gets a list of public templates that the user has access to.

## Inputs

- **accessapilevel** (optional): Allows COMMENTER access for inputs and return values. For backwards-compatibility, VIEWER is the default. For example, to see whether a user has COMMENTER access for a sheet, use accessApiLevel=1.

- **includeall** (optional): If true, include all results, that is, do not paginate. Mutually exclusive with page and pageSize (they are ignored if includeAll=true is specified).
- **level** (optional): Level of public template types. 0 refers to only Sheet types, 1 refers to all types.
- **page** (optional): Which page to return. Defaults to 1 if not specified. If you specify a value greater than the total number of pages, the last page of results is returned.
- **pagesize** (optional): The maximum number of items to return per page. Unless otherwise stated for a specific endpoint, defaults to 100. If only page is specified, defaults to a page size of 100. For reports, the default is 100 rows. If you need larger sets of data from your report, returns a maximum of 10,000 rows per request.
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
