# Add User Alternate Email

Adds an alternate email address to a user's account.

## Inputs

- `userId` (string, required): The ID of the user
- `email` (string, required): The alternate email address to add
- `outputVariable` (string, required): Variable to store the result

## Outputs

Returns the created alternate email with its ID and confirmation status.

## Example

```javascript
{
  "userId": "123456789",
  "email": "alternate@example.com",
  "outputVariable": "alternateEmail"
}
```

