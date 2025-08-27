# Get Campaign Recipient Info

This connector retrieves detailed information about a specific recipient of a Mailchimp campaign.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have already set up your API Key and Server Prefix in the connector settings
- You need to have an existing campaign ID

## Configuration

### Campaign and Recipient Details

- **Campaign ID**: Enter the unique identifier for your Mailchimp campaign. You can find this in your Mailchimp dashboard or in the URL when viewing a campaign.
  
- **Subscriber Hash/Email**: You can enter either:
  - The subscriber's email address (e.g., `user@example.com`)
  - The MD5 hash of the lowercase email address (e.g., `55502f40dc8b7c769880b10874abc12d`)
  
  The connector will automatically convert an email address to the required MD5 hash format.

### Optional Fields

- **Fields to Include**: A comma-separated list of specific fields you want to retrieve. This helps reduce response size if you only need certain information.
  
  Example: `email_address,status,open_count,last_open`
  
- **Fields to Exclude**: A comma-separated list of fields you want to exclude from the response.
  
  Example: `_links,merge_fields`

### Output

- **Output Variable**: Name of the variable that will store the recipient information. This variable will contain a JSON object with details like email address, open count, delivery status, etc.

## Example Response

The output will be a JSON object similar to this:

```json
{
  "email_id": "55502f40dc8b7c769880b10874abc12d",
  "email_address": "user@example.com",
  "status": "sent",
  "open_count": 3,
  "last_open": "2023-05-15T14:30:00+00:00",
  "campaign_id": "abc123def",
  "list_id": "def456ghi"
}
```

## Troubleshooting

- If you receive a "Resource Not Found" error, verify that both your Campaign ID and Subscriber Hash/Email are correct.
- Make sure the subscriber was actually included in the specified campaign.
- Check that your API Key and Server Prefix are correctly configured in the connector settings.