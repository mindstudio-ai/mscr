# Update MailChimp File Manager Folder

This action allows you to update the name of an existing folder in your MailChimp File Manager.

## Prerequisites

- You need a MailChimp account with API access
- You need your MailChimp API key and server prefix configured in the MailChimp service settings
- You need the ID of an existing folder in your MailChimp File Manager

## Configuration

### Folder ID

Enter the unique identifier for the folder you want to update. You can find folder IDs in your MailChimp account by:
1. Going to the File Manager in your MailChimp account
2. Selecting a folder
3. Looking at the URL - the folder ID will be part of the URL path

Example: `12345`

### New Folder Name

Enter the new name you want to give to the folder.

Example: `Marketing Assets 2023`

### Output Variable

Specify a variable name to store the response data from MailChimp. This will contain details about the updated folder including its ID, name, file count, creation date, and other metadata.

## Response Data

The output variable will contain a JSON object with the following structure:

```json
{
  "id": 12345,
  "name": "Marketing Assets 2023",
  "file_count": 42,
  "created_at": "2023-01-15T14:30:00+00:00",
  "created_by": "user@example.com",
  "_links": [...]
}
```

You can reference specific properties from this response in subsequent actions using dot notation, for example: `{{outputVariable.name}}` or `{{outputVariable.file_count}}`.