# Add User

Adds a new user to the organization.

## Inputs

- `email` (string, required): Email address of the user to add
- `firstName` (string, optional): First name of the user
- `lastName` (string, optional): Last name of the user
- `admin` (boolean, optional): Whether the user should be an admin
- `licensedSheetCreator` (boolean, optional): Whether the user should be a licensed sheet creator
- `outputVariable` (string, required): Variable to store the created user

## Outputs

Returns the created user with their ID and details.

## Example

```javascript
{
  "email": "newuser@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "admin": false,
  "licensedSheetCreator": true,
  "outputVariable": "newUser"
}
```

