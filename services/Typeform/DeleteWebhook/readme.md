# Delete Webhook

This connector allows you to delete a specific webhook from a Typeform form.

## What You'll Need

- **Form ID**: The unique identifier for your form
- **Webhook Tag**: The unique tag name of the webhook you want to delete

## Finding Your Form ID

Your Form ID can be found in your Typeform form URL. For example, in the URL:
```
https://mysite.typeform.com/to/u6nXL7
```
The Form ID is `u6nXL7`.

## Webhook Tag

The webhook tag is the unique identifier you assigned to your webhook when you created it. If you don't know the tag, you can:

1. Go to your Typeform dashboard
2. Select your form
3. Navigate to Connect > Webhooks
4. Find the webhook you want to delete and note its tag

## What Happens

When executed, this connector will:
1. Send a request to Typeform to delete the specified webhook
2. Return a success message if the webhook was deleted successfully
3. Return an error if the webhook doesn't exist or if there's an issue with the request

## Troubleshooting

- **404 Error**: This means the webhook with the specified tag doesn't exist for this form
- **401 Error**: This indicates an authentication issue with your Typeform account