# Delete Webhook

This action allows you to delete an existing webhook subscription from a Beehiiv publication.

## Prerequisites

- You need a Beehiiv API key configured in your connection settings
- You need to know the Publication ID and Webhook ID you want to delete

## Configuration

### Publication ID

Enter the ID of the publication that contains the webhook you want to delete. The ID must start with `pub_` followed by a UUID.

Example: `pub_12345678-1234-1234-1234-123456789012`

### Webhook ID

Enter the ID of the webhook you want to delete. The ID must start with `ep_` followed by a string of characters.

Example: `ep_0123456789abcdef0123456789`

## What happens when this action runs?

When this action runs, it will send a DELETE request to Beehiiv's API to remove the specified webhook. If successful, the webhook will be permanently deleted and will no longer receive notifications from the publication.

A successful deletion will return a 204 No Content response, indicating that the webhook has been successfully removed.

## Troubleshooting

- If you receive a 404 error, check that both your Publication ID and Webhook ID are correct
- If you receive a 400 error, there may be an issue with the format of your IDs
- If you receive a 429 error, you've exceeded the API rate limits and should try again later