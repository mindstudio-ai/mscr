# Share Workspace

Shares a workspace with users or groups.

## Inputs

- `workspaceId` (string, required): The ID of the workspace to share
- `shares` (array, required): Array of share objects with email and accessLevel
- `sendEmail` (boolean, optional): Whether to send email notifications
- `message` (string, optional): Message to include in the email notification
- `outputVariable` (string, required): Variable to store the sharing result

## Outputs

Returns the sharing result with details about each share created.

## Example

```javascript
{
  "workspaceId": "123456789",
  "shares": [
    {
      "email": "user@example.com",
      "accessLevel": "VIEWER"
    }
  ],
  "sendEmail": true,
  "message": "Check out this workspace!",
  "outputVariable": "sharingResult"
}
```

