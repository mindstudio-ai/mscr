# List Bases

This connector retrieves a list of Airtable bases that your authenticated account has access to.

## Configuration

### Pagination Offset
- **Optional**: Leave empty to get the first page of results
- If you need to fetch additional pages, provide the offset value returned from a previous request
- Example offset value: `itr23sEjsdfEr3282/appSW9R5uCNmRmfl6`

### Output Variable
- Specify a variable name to store the results
- The output will contain an array of bases with their IDs, names, and permission levels

## Output Format

The connector will return data in this format:

```json
{
  "bases": [
    {
      "id": "appLkNDICXNqxSDhG",
      "name": "Apartment Hunting",
      "permissionLevel": "create"
    },
    {
      "id": "appSW9R5uCNmRmfl6",
      "name": "Project Tracker",
      "permissionLevel": "edit"
    }
  ],
  "offset": "itr23sEjsdfEr3282/appSW9R5uCNmRmfl6"
}
```

The `offset` field will only be present if there are more results available. You can use this value in subsequent requests to fetch the next page of results.

## Permission Levels

Each base will have one of these permission levels:
- `create` - Full access including creating records
- `edit` - Can modify existing records
- `comment` - Can view and comment on records
- `read` - Read-only access
- `none` - No access