# Add Alternate Email

This connector adds an alternate email address for a specified user in Smartsheet.

## Configuration

### User Information

- **User ID**: The unique identifier of the user
- **Email Address**: The alternate email address to add
  - Must be a valid email format
  - A confirmation email will be sent to this address

### Output

- **Output Variable**: Name of the variable where the alternate email info will be stored

## Example Response

```json
{
  "id": 1234567890,
  "email": "john.doe.work@example.com",
  "confirmed": false
}
```

## Notes

- Requires system administrator permissions
- User must confirm the email address via link sent to the email
- Email cannot be used as alternate for multiple users
- Email must be unique across all Smartsheet accounts
