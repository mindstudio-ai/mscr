# Delete User Alternate Email

Deletes an alternate email address from a user's account.

## Inputs

- `userId` (string, required): The ID of the user
- `alternateEmailId` (string, required): The ID of the alternate email to delete
- `outputVariable` (string, required): Variable to store the deletion result

## Outputs

Returns a success message indicating the alternate email was deleted.

## Example

```javascript
{
  "userId": "123456789",
  "alternateEmailId": "987654321",
  "outputVariable": "deletionResult"
}
```

