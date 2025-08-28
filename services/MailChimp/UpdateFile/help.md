# Update File in Mailchimp File Manager

This connector allows you to update a file in your Mailchimp File Manager by changing its name or moving it to a different folder.

## Configuration

### File ID
Enter the unique ID of the file you want to update. You can find this ID in the Mailchimp File Manager or through the API.

Example: `12345`

### New File Name (Optional)
Enter a new name for the file if you want to rename it. Leave this field empty if you don't want to change the name.

Example: `newsletter-header.jpg`

### Folder ID (Optional)
Enter the ID of the folder where you want to move the file. You can find folder IDs in the Mailchimp File Manager or through the API.

- To move the file to a specific folder, enter the folder ID (e.g., `67890`)
- To remove the file from its current folder, enter `0`
- Leave this field empty if you don't want to change the file's location

### Output Variable
Enter a name for the variable that will store the updated file information. This variable will contain details about the file after the update, including its ID, name, URL, and other properties.

## Notes

- You must provide at least one change (either a new file name or folder ID) for the update to work
- Make sure your Mailchimp API key and server prefix are properly configured in the connector settings
- The file ID is required and must be valid for the update to succeed