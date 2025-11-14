# Copy Workspace

Creates a copy of a workspace.

## Inputs

- `workspaceId` (string, required): The ID of the workspace to copy
- `newName` (string, required): Name for the copied workspace
- `includes` (array, optional): Array of items to include (e.g., ["data", "attachments"])
- `outputVariable` (string, required): Variable to store the copied workspace

## Outputs

Returns the copied workspace with its new ID and details.

## Example

```javascript
{
  "workspaceId": "123456789",
  "newName": "Copy of My Workspace",
  "includes": ["data", "attachments"],
  "outputVariable": "copiedWorkspace"
}
```

