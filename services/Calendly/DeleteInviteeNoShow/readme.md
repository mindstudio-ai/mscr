# Delete Invitee No-Show

This connector allows you to remove the "no-show" status for an invitee in Calendly, marking them as having attended the meeting.

## When to use this connector

Use this connector when you need to:
- Mark an invitee as having attended a meeting
- Remove the "no-show" status from an invitee's record
- Update attendance records in Calendly

## Configuration

### Invitee Information

**Invitee No-Show UUID**
- This is the unique identifier for the no-show record you want to delete
- You can find this UUID in the URL when viewing the no-show record in Calendly
- Format example: `12345678-1234-1234-1234-123456789012`

### Response

**Success Message Variable**
- Choose a name for the variable that will store the success message
- This variable will contain confirmation when the no-show status is successfully removed

## Example Usage

This connector is useful in workflows where you need to:
- Update attendance records after confirming someone attended
- Correct mistakenly marked no-shows
- Automate attendance tracking processes

## Notes

- This action requires a valid Calendly OAuth connection
- A successful deletion returns a 204 No Content response
- If the UUID doesn't exist, you'll receive an error message