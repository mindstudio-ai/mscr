# Move Workspace

Moves a workspace to another location (folder or workspace).

## Inputs

- `workspaceId` (string, required): The ID of the workspace to move
- `destinationId` (string, required): ID of the destination (folder or workspace)
- `destinationType` (string, required): Type of destination ("folder" or "workspace")
- `outputVariable` (string, required): Variable to store the result

## Outputs

Returns the result of the move operation.

## Example

```javascript
{
  "workspaceId": "123456789",
  "destinationId": "987654321",
  "destinationType": "folder",
  "outputVariable": "moveResult"
}
```

