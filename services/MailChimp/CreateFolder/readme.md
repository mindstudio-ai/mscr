# Create Folder in Mailchimp File Manager

This action creates a new folder in your Mailchimp File Manager. These folders help you organize your images, PDFs, and other files that you use in your Mailchimp campaigns.

## Configuration

### Folder Name
Enter a name for the new folder you want to create. This will appear in your Mailchimp File Manager.

Example: `Newsletter Images`

### Output Variable
Specify a variable name to store the response from Mailchimp. The response will include details about the created folder such as:
- Folder ID
- Folder name
- Creation date
- Number of files (will be 0 for a new folder)

## Requirements

Before using this action, make sure you have:
1. Set up your Mailchimp API Key in the connection settings
2. Set up your Server Prefix (e.g., "us19") in the connection settings

## What happens when this runs?

When this action runs, it will:
1. Connect to your Mailchimp account
2. Create a new folder with the specified name in your File Manager
3. Return the folder details and store them in your specified output variable

You can then use this folder for organizing files in your Mailchimp account.