# List Event Types

This connector retrieves a list of event types from your Calendly account. Event types are the different meeting types you've configured in your Calendly account (like "15 Minute Meeting", "30 Minute Introduction", etc.).

## Configuration

### Query Parameters

- **User**: The URI of the user to list event types for. If left empty, the connector will use the authenticated user.
  - Example: `https://api.calendly.com/users/ABCDEFGHIJKLMNOPQRST`
  - You can find your user ID by going to your Calendly profile settings

- **Active Status**: Filter event types by their active status
  - **All Event Types**: Return both active and inactive event types
  - **Active Only**: Return only active event types
  - **Inactive Only**: Return only inactive event types

- **Count**: The number of event types to return per page (1-100). Default is 10.

- **Page Token**: For pagination. If you received a next page token from a previous request, enter it here to get the next page of results.

### Output

- **Output Variable**: The variable name where the results will be stored. The output will include:
  - `collection`: Array of event type objects
  - `pagination`: Information about next/previous pages

## Example Response

```json
{
  "collection": [
    {
      "uri": "https://api.calendly.com/event_types/ABCDEFGHIJKLMNOPQRST",
      "name": "15 Minute Meeting",
      "active": true,
      "description": "A brief introduction call",
      "slug": "15min",
      "color": "#0088ff",
      "duration": 15,
      "kind": "solo",
      "pooling_type": null,
      "type": "StandardEventType",
      "created_at": "2023-01-01T12:00:00.000000Z",
      "updated_at": "2023-01-01T12:00:00.000000Z",
      "internal_note": null,
      "scheduling_url": "https://calendly.com/username/15min",
      "secret": false,
      "profile": {
        "type": "User",
        "name": "John Doe",
        "owner": "https://api.calendly.com/users/ABCDEFGHIJKLMNOPQRST"
      }
    }
  ],
  "pagination": {
    "count": 1,
    "next_page": null,
    "previous_page": null,
    "next_page_token": null,
    "previous_page_token": null
  }
}
```