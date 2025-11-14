# Delete Alternate Email

Deletes an alternate email address for a specified user.

## Configuration

### Email Information
- **User ID**: The unique identifier of the user
- **Alternate Email ID**: The ID of the alternate email to delete

### Output
- **Output Variable**: Name of the variable to store the deletion result

## Example Response

```json
{
  "success": true,
  "deletedEmailId": 1234567890,
  "userId": 9876543210
}
```

## Notes
- Requires system administrator permissions
- Cannot delete the primary email address
- User must have at least one confirmed email

