# MailChimp List Segments

This action retrieves segments from a specific MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- You need to have your MailChimp API key and server prefix configured in the service settings
- You need to have at least one list (audience) created in your MailChimp account

## Configuration

### List Configuration

- **List ID**: Enter the unique identifier for the MailChimp list (audience) you want to retrieve segments from. 
  - You can find your List ID in MailChimp by going to Audience → Settings → Audience name and defaults
  - Example: `a1b2c3d4e5`

### Filtering Options

- **Count**: The number of segments to return (default: 10, maximum: 1000)
- **Offset**: The number of records to skip for pagination purposes (default: 0)
- **Segment Type**: Filter segments by their type:
  - All Types: Return all segment types
  - Saved: Return only saved segments
  - Static: Return only static segments (tags)
  - Fuzzy: Return only fuzzy segments (similar subscribers)
- **Include Cleaned Members**: Choose whether to include cleaned members in the response
- **Include Unsubscribed Members**: Choose whether to include unsubscribed members in the response

### Output

- **Output Variable**: The name of the variable that will store the list segments data

## Example Response

The output variable will contain a response object with the following structure:

```json
{
  "segments": [
    {
      "id": 123456,
      "name": "Segment Name",
      "member_count": 42,
      "type": "saved",
      "created_at": "2023-01-01T12:00:00+00:00",
      "updated_at": "2023-01-02T12:00:00+00:00",
      "options": {
        "match": "any",
        "conditions": [
          // Segment conditions
        ]
      },
      "list_id": "a1b2c3d4e5"
    }
  ],
  "list_id": "a1b2c3d4e5",
  "total_items": 1
}
```