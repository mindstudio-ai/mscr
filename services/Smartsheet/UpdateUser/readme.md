# Update User

Updates an existing user's information.

## Inputs

- `userId` (string, required): The ID of the user to update
- `admin` (boolean, optional): Whether the user should be an admin
- `licensedSheetCreator` (boolean, optional): Whether the user should be a licensed sheet creator
- `firstName` (string, optional): First name of the user
- `lastName` (string, optional): Last name of the user
- `outputVariable` (string, required): Variable to store the updated user

## Outputs

Returns the updated user information.

## Example

```javascript
{
  "userId": "123456789",
  "admin": true,
  "licensedSheetCreator": true,
  "outputVariable": "updatedUser"
}
```

