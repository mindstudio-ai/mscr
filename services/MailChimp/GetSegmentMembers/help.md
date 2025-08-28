# Get Segment Members - MailChimp

This connector retrieves members from a specific segment within a MailChimp list.

## Prerequisites

You need:
- A MailChimp account
- Your MailChimp API key (configured in the service settings)
- Your server prefix (e.g., "us19", configured in the service settings)
- List ID and Segment ID from your MailChimp account

## Configuration

### List and Segment Information

- **List ID**: Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account under Lists → Settings → List name and defaults.
  
- **Segment ID**: Enter the unique identifier for the segment within your list. You can find this in the URL when viewing a segment in your MailChimp account.

### Filtering Options

- **Count**: The number of members to return (maximum 1000). Default is 10.

- **Offset**: The number of records to skip. Useful for pagination when retrieving large segments in batches. Default is 0.

- **Include Unsubscribed Members**: Choose whether to include members who have unsubscribed from your list.

- **Include Cleaned Members**: Choose whether to include members whose emails have been cleaned (bounced).

- **Include Transactional Members**: Choose whether to include transactional members in the results.

### Output

- **Output Variable**: The name of the variable where the segment members data will be stored for use in subsequent steps.

## Output Data Structure

The output will be a JSON object containing:

```json
{
  "members": [
    {
      "id": "abc123def456",
      "email_address": "example@email.com",
      "full_name": "John Doe",
      "status": "subscribed",
      "merge_fields": {
        "FNAME": "John",
        "LNAME": "Doe"
      },
      "stats": {
        "avg_open_rate": 0.25,
        "avg_click_rate": 0.05
      }
      // Additional member information
    }
    // More members
  ],
  "total_items": 42,
  "_links": [
    // API navigation links
  ]
}
```