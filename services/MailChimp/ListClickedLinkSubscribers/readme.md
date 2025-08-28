# List Clicked Link Subscribers

This connector retrieves information about list members who clicked on a specific link in a MailChimp campaign.

## Prerequisites

- You need a MailChimp account with API access
- You need to have sent campaigns with trackable links
- You need to know the Campaign ID and Link ID you want to analyze

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for your campaign. You can find this in your MailChimp account under Reports or in the URL when viewing a campaign (e.g., `abc123def456`).
- **Link ID**: Enter the unique identifier for the specific link you want to analyze. You can find this by viewing the click report for your campaign in MailChimp (e.g., `xyz789`).

### Filtering Options

- **Count**: The number of subscriber records to return. Default is 10, maximum is 1000.
- **Offset**: The number of records to skip for pagination. Use this with Count to paginate through large result sets.

### Output Options

- **Output Variable**: The name of the variable where the results will be stored. This variable will contain an object with:
  - `members`: Array of subscribers who clicked the link
  - `campaign_id`: The campaign ID
  - `total_items`: Total number of matching subscribers
  - `_links`: API navigation links

## Example Response

```json
{
  "members": [
    {
      "email_id": "8a25ff1d98",
      "email_address": "example@email.com",
      "merge_fields": {
        "FNAME": "John",
        "LNAME": "Doe"
      },
      "vip": false,
      "clicks": 3,
      "campaign_id": "abc123def456",
      "url_id": "xyz789",
      "list_id": "def456abc123",
      "list_is_active": true,
      "contact_status": "subscribed"
    }
    // More members...
  ],
  "campaign_id": "abc123def456",
  "total_items": 42
}
```