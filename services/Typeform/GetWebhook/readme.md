# Typeform Get Webhook

This connector retrieves details about a specific webhook for a Typeform form.

## What You'll Need

- **Typeform Account**: You need a Typeform account with API access
- **Form ID**: The unique identifier for your form
- **Webhook Tag**: The unique name/tag of the webhook you want to retrieve

## Finding Your Form ID

The Form ID can be found in your form URL. For example, in the URL:
```
https://mysite.typeform.com/to/u6nXL7
```
The form ID is `u6nXL7`.

## Webhook Tag

This is the unique identifier you assigned to your webhook when you created it. If you're not sure what tags you have, you can use the "List Webhooks for a Form" connector first to see all webhooks and their tags.

## Output

The connector will return detailed information about the webhook, including:

- When it was created
- Whether it's enabled
- Event types it's subscribed to
- The webhook URL
- Other configuration details

The response will be stored in the output variable you specify.

## Example Response

```json
{
  "created_at": "2016-11-21T12:23:28.000Z",
  "enabled": true,
  "event_types": {
    "form_response": true,
    "form_response_partial": true
  },
  "form_id": "abc123",
  "id": "yRtagDm8AT",
  "tag": "phoenix",
  "updated_at": "2016-11-21T12:23:28.000Z",
  "url": "https://test.com",
  "verify_ssl": true
}
```