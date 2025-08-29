# Delete Scheduled Event

This connector allows you to delete a scheduled event in Calendly.

## How to use this connector

1. Enter the **Event UUID** of the scheduled event you want to delete. This is the unique identifier for the event in Calendly.
   - Example: `01234567-89ab-cdef-0123-456789abcdef`
   - You can find the UUID in the URL of the event or from the Calendly API

2. Optionally, provide a **Reason for Cancellation** to explain why the event is being deleted.
   - This information may be shared with the invitee depending on your Calendly settings

3. Specify an **Output Variable** name to store the result of the operation.
   - The output will contain information about whether the deletion was successful

## Output format

The connector returns an object with the following structure:

```json
{
  "success": true,
  "message": "Event successfully deleted"
}
```

If an error occurs, the output will include error details:

```json
{
  "success": false,
  "message": "Error deleting event: Event not found",
  "error": {
    "status": 404,
    "details": "..."
  }
}
```

## Notes

- This connector uses the Calendly V2 API
- Deleting an event will cancel it for all invitees
- You must have permission to delete the event in your Calendly account