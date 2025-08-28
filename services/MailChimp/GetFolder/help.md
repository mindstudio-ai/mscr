# MailChimp Get Folder

This connector retrieves detailed information about a specific folder in your MailChimp File Manager.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API Key must be configured in the MailChimp service settings
- Your MailChimp Server Prefix must be configured in the service settings

## Configuration

### Folder ID (Required)
Enter the unique identifier for the folder you want to retrieve. You can find folder IDs in the MailChimp File Manager or by using the List Folders action.

### Fields (Optional)
A comma-separated list of fields to include in the response. This helps to limit the response size if you only need specific information.

**Example:** `id,name,file_count`

Leave this field empty to return all available fields.

### Exclude Fields (Optional)
A comma-separated list of fields to exclude from the response.

**Example:** `created_at,created_by`

Leave this field empty to include all fields.

### Output Variable (Required)
The name of the variable where the folder information will be stored. This variable will contain all the folder details including:
- id: The unique folder ID
- name: The folder name
- file_count: The number of files in the folder
- created_at: When the folder was created
- created_by: Who created the folder
- _links: Related API links

## Example Response

```json
{
  "id": 12345,
  "name": "My Images",
  "file_count": 42,
  "created_at": "2023-01-15T12:30:45+00:00",
  "created_by": "user@example.com",
  "_links": [...]
}
```
