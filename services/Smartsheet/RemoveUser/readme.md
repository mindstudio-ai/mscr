# Remove User

Removes a user from the organization.

## Inputs

- `userId` (string, required): The ID of the user to remove
- `transferTo` (string, optional): User ID to transfer ownership of sheets to
- `removeFromSharing` (boolean, optional): Whether to remove the user from all shares
- `outputVariable` (string, required): Variable to store the removal result

## Outputs

Returns a success message indicating the user was removed.

## Example

```javascript
{
  "userId": "123456789",
  "transferTo": "987654321",
  "removeFromSharing": true,
  "outputVariable": "removalResult"
}
```

