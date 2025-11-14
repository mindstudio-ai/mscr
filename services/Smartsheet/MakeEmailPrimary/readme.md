# Make Email Primary

Makes an alternate email address the primary email for a specified user.

## Configuration

### Email Information
- **User ID**: The unique identifier of the user
- **Alternate Email ID**: The ID of the alternate email to promote

### Output
- **Output Variable**: Name of the variable to store the updated email info

## Example Response

```json
{
  "id": 1234567890,
  "email": "john.doe.work@example.com",
  "confirmed": true
}
```

## Notes
- Requires system administrator permissions
- Email must be confirmed before it can be made primary
- The current primary email becomes an alternate email
- User identity and access remains unchanged

