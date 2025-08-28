# List Survey Reports

This connector retrieves a list of survey reports from your Mailchimp account.

## Configuration Options

### Fields to Include
Optionally specify which fields you want to include in the response as a comma-separated list. This helps reduce the size of the response if you only need specific data.

**Example:** `id,title,total_responses,status`

### Fields to Exclude
Optionally specify which fields you want to exclude from the response as a comma-separated list.

**Example:** `_links,url`

### Number of Records
The number of survey reports to return in a single request. Default is 10, maximum is 1000.

### Offset
Used for pagination. Specifies the number of records to skip. Use this in combination with the Number of Records parameter to paginate through large result sets.

### Output Variable
The name of the variable where the survey reports data will be stored. This variable will contain an object with:
- `surveys`: An array of survey report objects
- `total_items`: The total number of surveys matching your query
- `_links`: API navigation links

## Example Response

The output will be structured like this:

```json
{
  "surveys": [
    {
      "id": "040d2c2e1f0",
      "web_id": 165,
      "list_id": "a1b2c3d4e5",
      "title": "Customer Feedback Survey",
      "status": "published",
      "total_responses": 810,
      "created_at": "2023-01-15T11:09:01+00:00",
      "updated_at": "2023-01-20T14:22:45+00:00"
    },
    // Additional survey reports...
  ],
  "total_items": 5,
  "_links": [
    // Navigation links...
  ]
}
```