# Get Campaign Info

This connector retrieves detailed information about a specific Mailchimp campaign.

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for the campaign you want to retrieve. This is required and can be found in your Mailchimp account or in the URL when viewing a campaign.

- **Fields to Include**: Optionally specify which fields you want to include in the response. This helps reduce the size of the response if you only need specific information.
  - Example: `id,web_id,status,settings.subject_line,recipients.list_name`
  - Leave blank to return all fields

- **Fields to Exclude**: Optionally specify which fields you want to exclude from the response.
  - Example: `_links,tracking,delivery_status`
  - Leave blank to exclude no fields

- **Include Resend Shortcut Eligibility**: Choose whether to include information about the campaign's eligibility for Mailchimp's Resend Shortcuts features.
  - Select "Yes" to include this information
  - Select "No" to exclude this information

- **Include Resend Shortcut Usage**: Choose whether to include information about campaigns related through Resend Shortcuts.
  - Select "Yes" to include this information
  - Select "No" to exclude this information

### Output

- **Output Variable**: Enter a name for the variable that will store the campaign information. You can reference this variable in subsequent steps of your workflow.

## Example Response

The response will include campaign details such as:

```json
{
  "id": "campaign_id",
  "web_id": 123456,
  "type": "regular",
  "status": "sent",
  "settings": {
    "subject_line": "Your Campaign Subject",
    "from_name": "Your Name",
    "reply_to": "your@email.com"
  },
  "recipients": {
    "list_id": "list_id",
    "list_name": "Your List Name",
    "recipient_count": 1000
  },
  "report_summary": {
    "opens": 500,
    "unique_opens": 450,
    "open_rate": 45.0,
    "clicks": 200,
    "subscriber_clicks": 180,
    "click_rate": 18.0
  }
}
```