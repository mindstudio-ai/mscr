# Search Everything

Searches all sheets that the user can access, for the specified text. If you have not used the public API in a while, we will need to provision your data. This could take up to 24 hours so please check back later!

## Inputs

- **query** (required): (Required) Text with which to perform the search. Enclose in double-quotes for an exact search.
- **location** (optional): **Deprecated** When specified with a value of **personalWorkspace**, limits the response to only those items in the user's workspaces.

- **modifiedsince** (optional): When specified with a date and time value, response only includes the objects that are modified on or after the date and time specified. If you need to keep track of frequent changes, it may be more useful to use Get Sheet Version.
- **include** (optional): When specified with a value of **favoriteFlag**, response indicates which returned items are favorites.  favorite -- dashboards, folders, reports, sheets, templates, and workspaces will have the property favorite: true parentObjectFavorite -- attachments, discussions, summary fields, and rows will have the property parentObjectFavorite: true

- **scopes** (optional): If search fails, try using an array for each type of this comma-separated list of search filters.
- **scopesValue** (optional): If search fails, try using an array for each type of this comma-separated list of search filters.
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
