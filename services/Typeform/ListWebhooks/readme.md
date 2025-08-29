# List Webhooks

This connector retrieves all webhooks configured for a specific Typeform form.

## What it does

The List Webhooks connector fetches all webhook configurations for a specified Typeform form and returns them as structured data. This is useful when you need to:

- View all existing webhook integrations for a form
- Check webhook settings before creating new ones
- Audit your form's integrations
- Prepare to update or delete webhooks

## Configuration

### Form Information

- **Form ID**: Enter the unique identifier for your Typeform form. 
  - This is found in your form's URL. For example, in `https://mysite.typeform.com/to/u6nXL7`, the Form ID is `u6nXL7`.

### Output Configuration

- **Output Variable**: Specify a variable name to store the list of webhooks.

## Output Format

The connector returns an array of webhook objects with the following properties:

```json
{
  "items": [
    {
      "id": "yRtagDm8AT",
      "form_id": "abc123",
      "tag": "phoenix",
      "url": "https://example.com/webhook",
      "enabled": true,
      "verify_ssl": true,
      "created_at": "2016-11-21T12:23:28.000Z",
      "updated_at": "2016-11-21T12:23:28.000Z",
      "event_types": {
        "form_response": true,
        "form_response_partial": true
      },
      "secret": "your-secret-key"
    }
  ]
}
```

## Authentication

This connector uses your Typeform OAuth token, which is managed automatically by MindStudio.