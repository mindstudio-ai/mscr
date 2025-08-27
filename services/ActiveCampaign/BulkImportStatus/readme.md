# Get Bulk Import Status

This connector retrieves the status of bulk imports in your ActiveCampaign account. It provides aggregate progress data showing both outstanding and recently completed batch jobs.

## When to use this connector

Use this connector when you need to:
- Monitor the progress of bulk imports you've initiated
- Check how many batches are still pending processing
- View recently completed import jobs (from the last seven days)

## Prerequisites

Before using this connector, make sure you have:
- Set up your ActiveCampaign API credentials in the service configuration
- Initiated at least one bulk import operation that you want to check

## Configuration

### Output Variable
Enter a name for the variable that will store the bulk import status results. This variable will contain the complete response from ActiveCampaign with information about both outstanding and recently completed imports.

## Output Format

The output will be structured as follows:

```json
{
  "outstanding": [
    {
      "forDate": "2023-06-01",
      "batches": "333",
      "contacts": "83250"
    }
  ],
  "recentlyCompleted": [
    {
      "forDate": "2023-06-01",
      "batches": "17",
      "contacts": "4250"
    },
    {
      "forDate": "2023-06-02",
      "batches": "50",
      "contacts": "12500"
    }
  ]
}
```

## Notes

- Add a short delay between creating a bulk import and checking its status. If you call this connector immediately after initiating a bulk import, the status may not be available yet.
- For more detailed information about specific imports, consider using the bulk import info endpoint instead.