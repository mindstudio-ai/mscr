# Get User Profile

This action retrieves the profile information of the current Canva user associated with the authenticated token.

## What it does

When executed, this action will:
1. Make a request to the Canva API using your authenticated token
2. Retrieve the current user's profile information (currently just display name)
3. Store the result in your specified output variable

## Authentication

This action requires a valid Canva access token with the `profile:read` scope. Make sure your Canva integration is properly configured with the required permissions.

## Configuration

### Output Variable

Enter a name for the variable that will store the user profile information. This variable will contain a JSON object with the user's profile details.

## Output Format

The output will be a JSON object with the following structure:

```json
{
  "profile": {
    "display_name": "Jane Doe"
  }
}
```

## Notes

- This endpoint is rate limited to 10 requests per minute per user
- Currently, the API only returns the display name, but more user information is expected to be included in future API updates