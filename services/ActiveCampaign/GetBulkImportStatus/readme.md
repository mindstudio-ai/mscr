# Get Bulk Import Status

This connector allows you to check the status of a bulk import operation in ActiveCampaign. It retrieves information about a specific import batch, including its current status, successfully imported contacts, and any failures.

## When to use this connector

Use this connector when you need to:
- Check if a bulk import operation has completed
- Get a list of successfully imported contact IDs
- Identify email addresses that failed to import

## Configuration

### Batch ID
Enter the ID of the bulk import batch you want to check. This is the batch ID that was returned when you created the bulk import.

### Output Variable
Specify a name for the variable that will store the results of the status check.

## Output

The connector returns a JSON object with the following properties:

```json
{
  "status": "completed",
  "success": ["123", "124", "125", "126"],
  "failure": ["invalid.email@invalidDomain", "invalid'character@example.com"]
}
```

The `status` field may contain one of the following values:
- `waiting`: The import has been received but processing has not begun
- `claimed`: The import batch has received a UUID but processing has not begun
- `active`: The import batch is currently being processed
- `completed`: The import batch has completed processing
- `failed`: The import batch has failed and cannot be retried
- `interrupted`: The import batch was interrupted due to failures and will not be retried

## Important Notes

There may be a short delay between creating a bulk import and the availability of its status. If you check the status immediately after creating an import, you might not get accurate results. It's recommended to add a brief delay before checking the status.