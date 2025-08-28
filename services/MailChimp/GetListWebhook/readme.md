# Get List Webhook

This action retrieves detailed information about a specific webhook configured for a Mailchimp list.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have configured the Mailchimp service with your API key and server prefix
- You need to have at least one list (audience) with webhooks configured

## Required Inputs

### List ID
The unique identifier for your Mailchimp list (audience). You can find this in your Mailchimp account under Audience settings or via the API.

Example: `4ca5becb8d`

### Webhook ID
The unique identifier for the webhook you want to retrieve information about. You can get this ID by listing all webhooks for a list first.

Example: `5d9a5e3f7b`

### Output Variable
The name of the variable where the webhook information will be stored. This variable will contain all details about the webhook, including:

- Webhook ID
- URL
- Configured events (subscribe, unsubscribe, profile, etc.)
- Configured sources (user, admin, API)
- List ID
- Related links

## Output Example

```json
{
  "id": "5d9a5e3f7b",
  "url": "http://yourdomain.com/webhook",
  "events": {
    "subscribe": true,
    "unsubscribe": true,
    "profile": true,
    "cleaned": true,
    "upemail": true,
    "campaign": true
  },
  "sources": {
    "user": true,
    "admin": true,
    "api": true
  },
  "list_id": "4ca5becb8d",
  "_links": [...]
}
```

## Common Issues

- **404 Error**: This typically means either the List ID or Webhook ID doesn't exist
- **401 Error**: This indicates an authentication issue with your Mailchimp API credentials
