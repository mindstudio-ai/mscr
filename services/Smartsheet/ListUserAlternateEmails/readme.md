# List User Alternate Emails

Lists all alternate email addresses for a user.

## Inputs

- `userId` (string, required): The ID of the user
- `outputVariable` (string, required): Variable to store the list of alternate emails

## Outputs

Returns a paginated list of alternate email addresses with their IDs and confirmation status.

## Example

```javascript
{
  "userId": "123456789",
  "outputVariable": "alternateEmails"
}
```

