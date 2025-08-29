# Cancel Event - Calendly

This connector allows you to cancel a scheduled event in Calendly.

## How to use this connector

1. **Event UUID** - Enter the UUID of the scheduled event you want to cancel. 
   - This is a unique identifier for the event
   - You can find this in the event URL (e.g., `https://calendly.com/username/meeting/01234567-89ab-cdef-0123-456789abcdef`)
   - Or retrieve it via the List Events API

2. **Cancellation Reason** (Optional) - Provide a reason for canceling the event.
   - This will be included in the cancellation notification
   - You can leave this blank if no reason is needed

3. **Output Variable** - Enter a name for the variable that will store the result of the cancellation operation.
   - This variable will contain an object with:
     - `success`: boolean indicating if the cancellation was successful
     - `message`: a descriptive message about the operation result

## Example Response

```json
{
  "success": true,
  "message": "Event successfully canceled"
}
```

## Troubleshooting

- **Event Not Found (404)**: Verify the Event UUID is correct and the event exists
- **Permission Issues (403)**: Ensure your Calendly connection has permission to cancel events
- **Already Canceled**: If the event was already canceled, the connector will return a success message