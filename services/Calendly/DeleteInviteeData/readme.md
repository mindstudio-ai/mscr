# Delete Invitee Data

This connector allows you to delete an invitee's data from a scheduled event in Calendly. This is particularly useful for compliance with data privacy regulations like GDPR.

## When to use this connector

- When you need to remove a participant's data from a Calendly event
- For privacy compliance and data management
- When automating user data deletion workflows

## Required information

### Event UUID
The unique identifier for the scheduled event. You can find this in the URL of your Calendly event or through the Calendly API.

Example: `123e4567-e89b-12d3-a456-426614174000`

### Invitee UUID
The unique identifier for the invitee whose data you want to delete. This can be obtained from the Calendly API when listing invitees for an event.

Example: `987e6543-e21b-34d5-c678-426614174999`

## Output

When successful, the connector will output a success object to your specified variable:

```json
{
  "success": true,
  "message": "Invitee data successfully deleted"
}
```

## Notes

- This operation permanently deletes the invitee's data and cannot be undone
- You must have appropriate permissions in Calendly to delete invitee data
- The connector uses the Calendly API v2