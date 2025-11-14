# List Users

Lists all users in the organization.

## Inputs

- `email` (string, optional): Email address to filter users by
- `includeAll` (boolean, optional): Include all user information
- `outputVariable` (string, required): Variable to store the list of users

## Outputs

Returns a paginated list of users with their details including ID, email, name, and status.

## Example

```javascript
{
  "email": "john@example.com",
  "includeAll": true,
  "outputVariable": "usersList"
}
```
