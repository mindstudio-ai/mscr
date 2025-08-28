# Get List Member Tags

This connector retrieves all tags assigned to a specific member of a MailChimp list (audience).

## Required Information

### List ID
Enter the unique identifier for your MailChimp list (audience). You can find this in your MailChimp account under Audience > Audience dashboard > Settings > Audience name and defaults. The List ID appears in the form of a string like `abc123def`.

### Subscriber Identifier
Enter either:
- The subscriber's email address (e.g., `email@example.com`)
- The MD5 hash of the lowercase version of the subscriber's email address
- The subscriber's contact ID

### Output Variable
Specify a name for the variable that will store the retrieved tags information.

## Optional Settings

### Maximum Tags to Return
The maximum number of tags to return in a single request. Default is 10, and the maximum allowed is 1000.

### Offset
The number of records to skip for pagination purposes. Default is 0.

## Output Format

The connector returns a JSON object with the following structure:

```json
{
  "tags": [
    {
      "id": 123456,
      "name": "Tag Name",
      "date_added": "2023-01-01T00:00:00+00:00"
    },
    ...
  ],
  "total_items": 5,
  "_links": [...]
}
```

## Troubleshooting

- If you receive a "Resource Not Found" error, verify that your List ID and Subscriber Identifier are correct.
- Ensure your MailChimp API key and Server Prefix are correctly configured in the service settings.
