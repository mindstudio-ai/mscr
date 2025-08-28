# Add Webhook

This connector creates a new webhook for a specific Mailchimp list. Webhooks allow Mailchimp to send notifications to your application when certain events occur.

## Configuration

### List Information
- **List ID**: Enter the unique identifier for your Mailchimp list. You can find this in your Mailchimp account under Audience settings.

### Webhook Configuration
- **Webhook URL**: Enter the full URL where Mailchimp should send webhook notifications. This must be a publicly accessible URL that can receive POST requests.

### Event Triggers
Configure which events will trigger the webhook:

- **Subscribe**: Notifications when someone subscribes to your list
- **Unsubscribe**: Notifications when someone unsubscribes
- **Profile Update**: Notifications when a subscriber updates their profile
- **Email Cleaned**: Notifications when an email is cleaned from your list
- **Email Updated**: Notifications when a subscriber changes their email address
- **Campaign Sent**: Notifications when a campaign is sent or cancelled

### Event Sources
Configure which sources of events will trigger the webhook:

- **User Actions**: Events initiated by subscribers themselves
- **Admin Actions**: Events initiated by admins in the Mailchimp interface
- **API Actions**: Events initiated through the Mailchimp API

### Output
- **Output Variable**: The name of the variable that will store the webhook creation result

## Example Response

The output variable will contain the complete webhook information, including:

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