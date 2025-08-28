# Delete Custom Field

This action allows you to delete a custom field from a Beehiiv publication.

## Configuration

### Publication ID
Enter the ID of your Beehiiv publication. This ID always starts with `pub_` followed by a string of alphanumeric characters.

Example: `pub_123abc456def`

You can find your publication ID in the URL when viewing your publication in the Beehiiv dashboard or via the Beehiiv API.

### Custom Field ID
Enter the ID of the custom field you want to delete.

Example: `cf_abc123def456`

You can find custom field IDs by using the "List Custom Fields" action or from the Beehiiv dashboard.

## Notes
- This action permanently deletes the custom field and cannot be undone
- Deleting a custom field will remove it from all subscribers
- This action returns no data as output
- You need a valid Beehiiv API key configured in your environment variables