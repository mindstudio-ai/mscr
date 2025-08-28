# MailChimp API Health Check

This connector performs a simple health check on the MailChimp API. It doesn't return any account-specific information, just a status message confirming the API is operational.

## What it does

When executed, this connector:
1. Connects to the MailChimp API using your credentials
2. Sends a "ping" request to check if the API is working
3. Returns the health status message (typically "Everything's Chimpy!" when successful)

## Configuration

### Output Variable
Enter a name for the variable that will store the API health status response. This variable will contain an object with a `health_status` property.

## Example Response

```json
{
  "health_status": "Everything's Chimpy!"
}
```

## Troubleshooting

If the connector fails:
- Verify your MailChimp API Key is correct
- Confirm your Server Prefix is correct (e.g., "us19")
- Check if your MailChimp account is active and in good standing

This connector is useful for testing your MailChimp API connection before using other MailChimp connectors.