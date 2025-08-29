# Create Webhook for Typeform

This connector allows you to create or update a webhook for a Typeform form. Webhooks let you receive real-time notifications when someone submits your form or completes specific parts of it.

## What You'll Need

- Your Typeform form ID
- A URL where you want to receive webhook data
- A unique tag name for your webhook

## Configuration Steps

### Webhook Configuration

- **Form ID**: Enter your form's unique ID. You can find this in your form URL. For example, in `https://mysite.typeform.com/to/u6nXL7`, the form ID is `u6nXL7`.
- **Webhook Tag**: Create a unique name for your webhook (e.g., `customer-submissions` or `lead-notifications`).
- **Webhook URL**: Enter the URL where Typeform will send data when form events occur. This should be a publicly accessible endpoint that can receive POST requests.
- **Enable Webhook**: Choose whether to enable the webhook immediately.

### Event Types

- **Form Response**: Enable to receive notifications when someone completes your form.
- **Partial Form Response**: Enable to receive notifications for partial form submissions (when someone starts but doesn't complete your form).

### Advanced Settings (Optional)

- **Verify SSL**: Keep enabled to verify SSL certificates when delivering payloads (recommended for security).
- **Secret Key**: If you want to verify webhook requests came from Typeform, enter a secret key. This will be used to sign the webhook payload with HMAC SHA256.

### Response Handling

- **Output Variable**: Enter a name for the variable that will store the webhook creation response.

## What Happens Next

After configuring the webhook, Typeform will send data to your specified URL whenever the selected events occur. The response will include details about the created webhook, including its ID, creation date, and configuration.

## Example Webhook Payload

When someone submits your form, Typeform will send a payload similar to this to your webhook URL:

```json
{
  "event_id": "01EXAMPLEID",
  "event_type": "form_response",
  "form_response": {
    "form_id": "yourFormId",
    "token": "responseToken",
    "submitted_at": "2023-04-01T12:00:00Z",
    "answers": [
      {
        "type": "text",
        "text": "John Doe",
        "field": {
          "id": "fieldId",
          "type": "short_text"
        }
      }
    ]
  }
}
```