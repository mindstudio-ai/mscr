# List Report Shares

Gets a list of all users and groups to whom the specified Report is shared, and their access level.
This operation supports query string parameters for pagination of results.

## Inputs

- **reportId** (required): (Required) reportID of the report being accessed.
- **sharinginclude** (optional): When applicable for the specific object this parameter defines the scope of the share. Possible values are ITEM or WORKSPACE. ITEM is an item-level share (that is, the specific object to which the share applies is shared with the user or group). WORKSPACE is a workspace-level share (that is, the workspace that contains the object to which the share applies is shared with the user or group).
- **includeall** (optional): If true, include all results, that is, do not paginate. Mutually exclusive with page and pageSize (they are ignored if includeAll=true is specified).
- **page** (optional): Which page to return. Defaults to 1 if not specified. If you specify a value greater than the total number of pages, the last page of results is returned.
- **pagesize** (optional): The maximum number of items to return per page. Unless otherwise stated for a specific endpoint, defaults to 100. If only page is specified, defaults to a page size of 100. For reports, the default is 100 rows. If you need larger sets of data from your report, returns a maximum of 10,000 rows per request.
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
