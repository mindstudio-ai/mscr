# List Alternate Emails

This connector retrieves all alternate email addresses for a specified user in Smartsheet.

## Configuration

### User Information
- **User ID**: The unique identifier of the user
  - System administrators can view alternate emails for any user
  - Regular users can only view their own alternate emails

### Output
- **Output Variable**: Name of the variable where the alternate emails will be stored

## Example Response

```json
{
  "totalCount": 2,
  "alternateEmails": [
    {
      "id": 1234567890,
      "email": "john.doe.work@example.com",
      "confirmed": true
    },
    {
      "id": 9876543210,
      "email": "j.doe@example.org",
      "confirmed": false
    }
  ]
}
```

## Notes
- Requires system administrator permissions to view other users' alternate emails
- Users can always view their own alternate emails
- Only confirmed emails can be made primary

