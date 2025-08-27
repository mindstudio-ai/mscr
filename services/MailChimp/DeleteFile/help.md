# Delete File from MailChimp File Manager

This action allows you to permanently delete a specific file from your MailChimp File Manager.

## Prerequisites

- You need a MailChimp account with API access
- You must have the File ID of the file you want to delete
- Your API Key and Server Prefix must be configured in the MailChimp service settings

## How to use this action

1. **File ID**: Enter the unique identifier for the file you want to delete. You can find this ID in the MailChimp File Manager or via the API.

2. **Confirmation Message**: Enter a variable name that will store the confirmation message after the file is deleted. This variable can be used in subsequent steps of your workflow.

## Important Notes

- Deleting a file is permanent and cannot be undone
- If the file is currently in use in any campaigns or templates, deleting it may cause those assets to break
- The action will return a success message when the file is deleted successfully

## Example Use Case

Use this action when you need to clean up old or unused files from your MailChimp account as part of an automated workflow.