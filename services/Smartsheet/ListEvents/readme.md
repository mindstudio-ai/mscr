# List Events

Lists events for monitoring changes to sheets, users, and other objects.

## Configuration
- **Since**: Optional timestamp to filter events (ISO 8601 format)
- **Stream Position**: Optional position for paging through results
- **Output Variable**: Variable to store events

## Example Response
```json
{
  "moreAvailable": true,
  "nextStreamPosition": "abc123xyz",
  "events": [
    {
      "eventId": "123",
      "objectType": "SHEET",
      "action": "UPDATE",
      "objectId": 456,
      "userId": 789,
      "requestUserId": 789,
      "timestamp": "2025-01-15T10:30:00Z"
    }
  ]
}
```

## Notes
- Use for audit trails
- Page through results with streamPosition
- Events retained for 14 days

