# Get Campaign Send Checklist

This action retrieves the send checklist for a MailChimp campaign. The checklist shows whether a campaign is ready to send and any issues that need to be resolved before sending.

## Required Configuration

### Campaign ID
Enter the unique identifier for the campaign you want to check. You can find this ID in the URL when viewing a campaign in MailChimp or by using the List Campaigns action.

Example: `b93e5e8b0d`

## Optional Parameters

### Fields to Include
A comma-separated list of fields to include in the response. This can help reduce the size of the response if you only need specific information.

Example: `is_ready,items`

### Fields to Exclude
A comma-separated list of fields to exclude from the response.

Example: `_links`

## Output

The action returns a JSON object containing:

- `is_ready`: Boolean indicating if the campaign is ready to send
- `items`: Array of feedback items to review before sending, each containing:
  - `type`: The item type (success, warning, or error)
  - `id`: The ID for the specific item
  - `heading`: The heading for the specific item
  - `details`: Details about the specific feedback item
- `_links`: Array of link objects related to the resource

Example output:
```json
{
  "is_ready": false,
  "items": [
    {
      "type": "warning",
      "id": 42,
      "heading": "Subject line is empty",
      "details": "You should add a subject line to your campaign."
    }
  ],
  "_links": [...]
}
```
