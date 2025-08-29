# Delete Workspace

This connector allows you to permanently delete a Typeform workspace.

## ⚠️ Warning
Deleting a workspace is permanent and cannot be undone. All forms and data associated with the workspace will be permanently deleted.

## What you'll need
- A Typeform account with appropriate permissions to delete workspaces
- The unique ID of the workspace you want to delete

## Configuration

### Workspace ID
Enter the unique identifier of the workspace you want to delete. You can find workspace IDs by:
1. Using the Typeform API to list all workspaces
2. Checking the URL when viewing a workspace in the Typeform dashboard

Example workspace ID: `abc123` or `wsp_abcdef123456`

## After execution
Upon successful deletion, the workspace will be removed from your Typeform account. The API returns no content on success (HTTP 204).

## Troubleshooting
- **404 Not Found**: The workspace ID doesn't exist or has already been deleted
- **403 Forbidden**: You don't have permission to delete this workspace
- **401 Unauthorized**: Your authentication token is invalid or expired