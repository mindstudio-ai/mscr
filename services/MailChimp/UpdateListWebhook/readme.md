# Update Mailchimp List Webhook

This connector allows you to update an existing webhook for a Mailchimp list. Webhooks let you receive notifications when certain events occur in your Mailchimp account, such as when someone subscribes or unsubscribes from your list.

## Required Information

### Webhook Details
- **List ID**: The unique identifier for your Mailchimp list (also called an audience). You can find this in your Mailchimp account under Audience settings.
- **Webhook ID**: The ID of the existing webhook you want to update. You can get this ID by viewing your list's webhooks in Mailchimp or from the API.
- **Webhook URL**: The URL that Mailchimp will send webhook data to when events occur (e.g., `https://yourdomain.com/webhook`).

### Events
Configure which events will trigger the webhook:
- **Subscribe**: When someone subscribes to your list
- **Unsubscribe**: When someone unsubscribes from your list
- **Profile Update**: When a subscriber updates their profile information
- **Email Cleaned**: When an email is cleaned from your list (e.g., due to bounces)
- **Email Updated**: When a subscriber changes their email address
- **Campaign Sent**: When a campaign is sent or cancelled

### Sources
Configure which sources of events will trigger the webhook:
- **User Actions**: Actions initiated by subscribers
- **Admin Actions**: Actions initiated by administrators in the Mailchimp interface
- **API Actions**: Actions initiated through the Mailchimp API

## Output
The connector will return the updated webhook information in the specified output variable.

## Example Use Case
You might update a webhook when you need to:
- Change the URL where webhook data is sent
- Enable or disable specific events that trigger the webhook
- Modify which sources can trigger the webhook