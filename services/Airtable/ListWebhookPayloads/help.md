# List Webhook Payloads

This connector retrieves webhook payloads from an Airtable base. When you receive a webhook ping, you can use this connector to retrieve the actual payload data.

## Configuration

### Webhook Configuration

- **Base ID**: Enter your Airtable base ID. This is typically found in the API documentation or in the URL when viewing your base (e.g., `appABC123DEF456`).
- **Webhook ID**: Enter the ID of the webhook you want to retrieve payloads for (e.g., `wnk123456789012`).

### Optional Parameters

- **Cursor**: The transaction number to start listing payloads from. The first time you call this action, you can omit this parameter (it will default to 1). For subsequent calls, use the cursor value returned from the previous response.
- **Limit**: Maximum number of payloads to return in a single request. Maximum value is 50.

### Output

- **Output Variable**: Name of the variable that will store the webhook payloads response.

## Response Format

The connector returns a JSON object with the following structure:

```json
{
  "cursor": 5,
  "mightHaveMore": false,
  "payloads": [
    {
      "actionMetadata": {
        "source": "client",
        "sourceMetadata": {
          "user": {
            "email": "user@example.com",
            "id": "usr00000000000000",
            "permissionLevel": "create"
          }
        }
      },
      "baseTransactionNumber": 4,
      "payloadFormat": "v0",
      "timestamp": "2022-02-01T21:25:05.663Z"
    }
  ]
}
```

## Notes

- Payloads are deleted from Airtable's servers after 1 week whether or not they have been retrieved.
- If `mightHaveMore` is `true`, you should immediately send another request with the returned cursor value to retrieve additional payloads.
- This connector requires a valid Airtable bearer token, which should be configured in your service connection.