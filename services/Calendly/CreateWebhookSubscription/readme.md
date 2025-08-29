# Create Webhook Subscription

This connector creates a new webhook subscription in Calendly. Webhooks allow you to receive real-time notifications when specific events occur in your Calendly account.

## Configuration

### Webhook Configuration

- **Callback URL**: Enter the HTTPS URL where you want to receive webhook notifications. This must be a publicly accessible endpoint that can receive POST requests.
  - Example: `https://example.com/webhooks/calendly`

- **Events**: Enter a comma-separated list of Calendly events you want to subscribe to.
  - Common events include:
    - `invitee.created` - When someone schedules a meeting
    - `invitee.canceled` - When someone cancels a meeting
    - `routing_form.submission.created` - When a routing form is submitted
  - Example: `invitee.created,invitee.canceled`

- **Scope**: Select the scope for your webhook subscription:
  - **User**: Only receive events related to the authenticated user
  - **Organization**: Receive events for the entire organization

### Advanced Options

- **Signing Key** (Optional): If provided, Calendly will use this key to sign the webhook payload, allowing you to verify that requests are coming from Calendly. Must be at least 16 characters.
  - Example: `your-secret-signing-key-1234`

### Output

- **Output Variable**: Name of the variable that will store the webhook subscription details, including the subscription ID, which you'll need if you want to manage this webhook later.

## Notes

- Your callback URL must be publicly accessible and support HTTPS
- You can create multiple webhook subscriptions for different purposes
- To delete a webhook subscription, use the "Delete Webhook Subscription" connector with the webhook ID