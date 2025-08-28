# Introspect Notion Token

This connector allows you to check information about a Notion access token, including:
- Whether the token is active
- The permissions scope of the token
- When the token was issued

## When to use this connector

Use this connector when you need to:
- Verify if a Notion token is still valid
- Check what permissions a token has
- Determine when a token was created

## Configuration

### Token to Introspect
- Enter the Notion access token you want to check
- Leave this field blank to use your current integration token (recommended for most use cases)

### Output Variable
- Enter a name for the variable that will store the token information
- This variable will contain a JSON object with the token details

## Example Output

The output variable will contain a JSON object similar to this:

```json
{
  "active": true,
  "scope": "read_content insert_content update_content",
  "iat": 1727554061083
}
```

Where:
- `active`: Boolean indicating if the token is valid
- `scope`: String showing what permissions the token has
- `iat`: Integer timestamp of when the token was issued

## Notes

- This connector uses your Notion integration's authentication
- No additional permissions are required beyond what your integration already has