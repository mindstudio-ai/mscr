# Delete Webhook

This action allows you to delete a webhook from your WooCommerce store by its ID.

## Configuration

### Webhook ID
Enter the numeric ID of the webhook you want to delete. You can find webhook IDs by viewing your webhooks in the WooCommerce admin or by using the "List Webhooks" action.

Example: `142`

### Force Delete
Choose whether to permanently delete the webhook:
- **No (Soft Delete)**: The webhook may be moved to trash depending on your site configuration
- **Yes (Permanent Delete)**: The webhook will be permanently deleted

## Output

The action returns the complete data of the deleted webhook, including:
- ID
- Name
- Status
- Topic
- Resource
- Event
- Hooks
- Delivery URL
- Creation and modification dates

## Authentication

This action requires your WooCommerce store URL, API Consumer Key, and API Consumer Secret to be configured in the WooCommerce service settings.