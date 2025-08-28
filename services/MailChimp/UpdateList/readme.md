# Update Mailchimp List

This action allows you to update the settings for an existing Mailchimp list (audience).

## Prerequisites

- You need a Mailchimp account with API access
- You need your Mailchimp API key and server prefix configured in the service settings
- You need the ID of the list you want to update

## Configuration

### List Information

- **List ID**: Enter the unique identifier for the list you want to update. You can find this in your Mailchimp account under Audience settings or in the URL when viewing your audience.
- **List Name**: Enter the new name for your list.
- **Permission Reminder**: Enter a message explaining how subscribers got on your list. This appears in campaign footers.
- **Email Type Option**: Choose whether subscribers can select between HTML and plain-text emails.

### Contact Information

This information appears in campaign footers to comply with anti-spam laws:

- **Company Name**: Your organization's name
- **Address Line 1**: Your street address
- **City**: Your city
- **State/Province**: Your state or province
- **Postal/Zip Code**: Your postal or zip code
- **Country**: A two-character country code (e.g., US, GB, CA)

### Campaign Defaults

These settings are used as defaults when creating new campaigns:

- **From Name**: The default sender name
- **From Email**: The default sender email address
- **Subject**: The default subject line
- **Language**: The default language code (e.g., en, es, fr)

### Additional Settings (Optional)

- **Double Opt-in**: Whether subscribers must confirm their subscription via email
- **Marketing Permissions**: Whether GDPR marketing permissions are enabled
- **Notify On Subscribe**: Email address to notify when someone subscribes
- **Notify On Unsubscribe**: Email address to notify when someone unsubscribes

### Output

- **Output Variable**: Name of the variable that will store the API response containing the updated list information

## Example Response

The output variable will contain the complete list information, including:

```json
{
  "id": "abc123def",
  "web_id": 12345,
  "name": "My Updated List",
  "contact": {
    "company": "Your Company",
    "address1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US"
  },
  "permission_reminder": "You're receiving this email because you signed up at our website.",
  "campaign_defaults": {
    "from_name": "John Smith",
    "from_email": "john@example.com",
    "subject": "News from Our Company",
    "language": "en"
  },
  "stats": {
    "member_count": 42,
    "unsubscribe_count": 2,
    "cleaned_count": 0
  }
}
```