# Get Contact Tracking Logs

This connector retrieves tracking logs for a specific contact in ActiveCampaign.

## Configuration

### Contact ID
Enter the numeric ID of the contact you want to retrieve tracking logs for. This is the unique identifier for the contact in your ActiveCampaign account.

Example: `42`

### Output Variable
Specify a name for the variable that will store the tracking logs data. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns the tracking logs data in the following format:

```json
{
  "trackingLogs": [
    {
      "id": "123",
      "type": "email_open",
      "date": "2023-05-15T10:30:45Z",
      "details": "..."
    },
    {
      "id": "124",
      "type": "page_visit",
      "date": "2023-05-15T10:32:12Z",
      "details": "..."
    }
  ]
}
```

If no tracking logs are found, the response will contain an empty array:

```json
{
  "trackingLogs": []
}
```

## Troubleshooting

- **404 Error**: This typically means the contact ID doesn't exist in your ActiveCampaign account.
- **Authentication Error**: Verify your API key and account URL are correctly configured in the service settings.