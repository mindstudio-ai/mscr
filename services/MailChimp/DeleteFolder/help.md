# Delete Folder

This action deletes a specific folder from your MailChimp File Manager.

## Prerequisites

- You need a MailChimp account with API access
- You must have the ID of the folder you want to delete
- The folder must exist in your MailChimp File Manager

## Configuration

### Folder ID

Enter the unique identifier of the folder you want to delete. You can find folder IDs by:

1. Going to your MailChimp account
2. Navigating to Content > File Manager
3. Finding the folder you want to delete
4. The folder ID is in the URL when you open the folder, formatted as a string of numbers and letters

Example folder ID: `6a3d0f7b9e`

## Important Notes

- Deleting a folder will also delete all files and subfolders contained within it
- This action cannot be undone
- The action will return a success message when the folder is deleted successfully
