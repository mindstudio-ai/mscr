# Get Automation Info

This connector retrieves detailed information about a specific automation workflow in MailChimp.

## Prerequisites

- You need a MailChimp account with API access
- You need to have created at least one automation workflow in MailChimp

## Configuration

### Workflow ID

Enter the unique identifier for the automation workflow you want to retrieve. You can find this ID in the URL when viewing the automation in MailChimp or through the MailChimp API.

Example: `4e0643c803`

### Fields to Include (Optional)

If you only want specific fields returned, enter them as a comma-separated list. Use dot notation for nested fields.

Example: `id,status,settings.title,recipients.list_id`

### Fields to Exclude (Optional)

If you want to exclude specific fields from the response, enter them as a comma-separated list. Use dot notation for nested fields.

Example: `_links,tracking,report_summary`

### Output Variable

Enter a name for the variable that will store the automation workflow information. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns comprehensive information about the automation workflow, including:

- Basic details (ID, status, creation time)
- Settings (title, from name, reply-to address)
- Recipient information
- Tracking options
- Trigger settings
- Report summary (if available)

## Example Response

```json
{
  "id": "4e0643c803",
  "create_time": "2023-01-15T14:30:45+00:00",
  "start_time": "2023-01-15T15:00:00+00:00",
  "status": "sending",
  "emails_sent": 1250,
  "recipients": {
    "list_id": "a1b2c3d4e5",
    "list_name": "Newsletter Subscribers"
  },
  "settings": {
    "title": "Welcome Series",
    "from_name": "Your Company",
    "reply_to": "hello@example.com"
  }
}
```