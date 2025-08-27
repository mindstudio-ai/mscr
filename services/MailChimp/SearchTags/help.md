# Search Tags

This connector allows you to search for tags on a MailChimp list by name or retrieve all tags on a list.

## Configuration

### List Information
- **List ID** (required): Enter the unique identifier for your MailChimp list. You can find your list ID in the MailChimp dashboard under Audience settings.
  - Example: `a1b2c3d4e5`
- **Tag Name** (optional): Enter a search term to filter tags. The search will return all tags that start with this text.
  - If left empty, all tags on the list will be returned.
  - Example: `customer` would match tags like "customer", "customer-vip", etc.

### Output
- **Output Variable**: Name of the variable where the search results will be stored.

## Output Format

The output will be a JSON object with the following structure:

```json
{
  "tags": [
    {
      "id": 123456,
      "name": "tag-name"
    },
    ...
  ],
  "total_items": 10
}
```

## Example Usage

You can use this connector to:
- Get all tags on a list to display in a dropdown
- Search for specific tags to apply to contacts
- Check if certain tags exist before creating them
