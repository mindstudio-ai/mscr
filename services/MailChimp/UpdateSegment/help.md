# Update Segment in Mailchimp

This action allows you to update an existing segment in your Mailchimp list.

## Prerequisites

- You need a Mailchimp account with API access
- You need your Mailchimp API Key and Server Prefix configured in the service settings
- You need to know the List ID and Segment ID you want to update

## Configuration

### List Information

- **List ID**: Enter the unique identifier for your Mailchimp list. You can find this in your Mailchimp account under the list settings or in the URL when viewing the list.
- **Segment ID**: Enter the unique identifier for the segment you want to update. You can find this in the URL when viewing the segment in Mailchimp.

### Segment Settings

- **Segment Name**: Enter the new name you want to give to the segment.
- **Match Type**: Choose how the segment conditions should be applied:
  - **Match Any Condition**: Subscribers who match at least one of the segment conditions will be included
  - **Match All Conditions**: Only subscribers who match all of the segment conditions will be included

### Output

- **Output Variable**: Enter a name for the variable that will store the response from Mailchimp. This variable will contain information about the updated segment.

## Example Response

```json
{
  "id": 123456,
  "name": "Active Subscribers",
  "member_count": 42,
  "type": "saved",
  "created_at": "2023-01-15T12:45:00+00:00",
  "updated_at": "2023-06-20T15:30:00+00:00",
  "options": {
    "match": "any"
  },
  "list_id": "abc123def"
}
```

## Notes

- This action only updates the basic segment properties (name and match type)
- To update segment conditions, you would need to use the Mailchimp web interface or a more advanced integration
- Changes take effect immediately in your Mailchimp account