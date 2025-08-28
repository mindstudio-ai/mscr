# Get Abuse Report

This connector retrieves details about a specific abuse report for a MailChimp list/audience. An abuse report is created when a recipient clicks "report spam" in their email program.

## Configuration

### List ID
Enter the unique identifier for your MailChimp list/audience. You can find this in your MailChimp account by going to Audience > Settings > Audience name and defaults. The List ID appears in the form of a string like `a1b2c3d4e5`.

### Report ID
Enter the ID of the specific abuse report you want to retrieve. This is typically a numeric value.

### Fields to Include (Optional)
A comma-separated list of fields you want to include in the response. This allows you to limit the data returned to only what you need.

Example: `id,email_address,date,campaign_id`

### Fields to Exclude (Optional)
A comma-separated list of fields you want to exclude from the response.

Example: `_links,merge_fields`

### Output Variable
Enter a name for the variable that will store the abuse report details. You can reference this variable in subsequent steps of your workflow.

## Example Response

The connector will return data similar to this:

```json
{
  "id": 123,
  "campaign_id": "campaign123",
  "list_id": "list123",
  "email_id": "md5hash",
  "email_address": "user@example.com",
  "merge_fields": {
    "FNAME": "John",
    "LNAME": "Doe"
  },
  "vip": false,
  "date": "2023-01-15T12:30:45+00:00"
}
```