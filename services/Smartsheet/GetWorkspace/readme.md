# Get Workspace

Gets details about a specific workspace.

## Inputs

- `workspaceId` (string, required): The ID of the workspace to retrieve
- `loadAll` (boolean, optional): Load all workspace information including contents
- `outputVariable` (string, required): Variable to store the workspace details

## Outputs

Returns detailed information about the workspace including its contents (sheets, folders, reports).

## Example

```javascript
{
  "workspaceId": "123456789",
  "loadAll": true,
  "outputVariable": "workspaceDetails"
}
```

