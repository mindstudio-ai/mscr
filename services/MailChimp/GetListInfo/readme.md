# Get List Info

This connector retrieves detailed information about a specific MailChimp list (audience).

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API key (found in your account under Account > Extras > API keys)
- Your MailChimp server prefix (e.g., "us19" from your MailChimp URL)

## Configuration

### List Configuration

- **List ID**: Enter the unique identifier for your MailChimp list/audience. You can find this in your MailChimp account by going to Audience > Settings > Audience name and defaults. The List ID appears as "Audience ID" and looks like `1a2b3c4d5e`.

- **Include Total Contacts**: Choose whether to include the total number of contacts in the list (including subscribed, unsubscribed, pending, cleaned, etc.).

### Advanced Options

- **Fields to Include**: Optionally specify which fields to include in the response as a comma-separated list. Leave empty to return all fields.
  Example: `id,name,stats.member_count,stats.unsubscribe_count`

- **Fields to Exclude**: Optionally specify which fields to exclude from the response as a comma-separated list.
  Example: `_links,modules,beamer_address`

### Output

- **Output Variable**: The name of the variable where the list information will be stored for use in subsequent steps.

## Example Response

The connector returns a JSON object with detailed information about the list, including:

```json
{
  "id": "abc123def",
  "name": "My Newsletter",
  "stats": {
    "member_count": 1250,
    "unsubscribe_count": 50,
    "open_rate": 24.5,
    "click_rate": 12.8
  },
  "contact": {
    "company": "My Company",
    "address1": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345",
    "country": "US"
  },
  "permission_reminder": "You're receiving this email because you signed up for updates from My Company.",
  "campaign_defaults": {
    "from_name": "John Doe",
    "from_email": "john@example.com",
    "subject": "My Newsletter",
    "language": "en"
  }
}
```