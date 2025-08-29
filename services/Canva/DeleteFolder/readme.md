# Delete Folder in Canva

This connector allows you to delete a folder in Canva. When a folder is deleted:

- Content owned by the user is moved to the Trash
- Content owned by other users is moved to the top level of the owner's projects

## Prerequisites

- You must have a Canva account with the appropriate permissions to delete folders
- Your integration must have the `folder:write` scope enabled

## Configuration

### Folder ID

Enter the unique identifier of the folder you want to delete. You can find the folder ID in the Canva API or through other Canva API endpoints that list folders.

**Example:** `fld-123e4567-e89b-12d3-a456-426614174000`

## Important Notes

- This is a permanent action that cannot be undone through the API
- Users can still recover their content from the Trash within Canva's retention period
- The operation is rate limited to 20 requests per minute per user
- The connector will return a success message when the folder is successfully deleted