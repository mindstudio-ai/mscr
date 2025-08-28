# Get List Merge Fields

This connector retrieves all merge fields (custom fields) for a specified Mailchimp audience. Merge fields are the fields you use to collect and store information about your subscribers, such as first name, last name, birthday, etc.

## Configuration

### List Configuration

- **List ID**: Enter the unique identifier for your Mailchimp audience (list). You can find this in your Mailchimp account under Audience settings > Settings > Audience name and defaults. It typically looks like `abc123def`.

### Filter Options

- **Count**: The number of merge fields to return. Default is 10, maximum is 1000.
- **Offset**: The number of records to skip. Useful for pagination when you have many merge fields.
- **Field Type**: Filter to only show merge fields of a specific type (e.g., text, number, address).
- **Required Fields Only**: Choose "Required Fields Only" to filter the results to only show fields that are marked as required in your Mailchimp audience.

### Output

- **Output Variable**: The name of the variable that will store the results. This variable will contain an object with the merge fields array and metadata.

## Example Response

The output variable will contain a response like this:

```json
{
  "merge_fields": [
    {
      "merge_id": 1,
      "tag": "FNAME",
      "name": "First Name",
      "type": "text",
      "required": false,
      "default_value": "",
      "public": true,
      "display_order": 1,
      "options": {
        "size": 25
      },
      "help_text": "",
      "list_id": "abc123def"
    },
    {
      "merge_id": 2,
      "tag": "LNAME",
      "name": "Last Name",
      "type": "text",
      "required": false,
      "default_value": "",
      "public": true,
      "display_order": 2,
      "options": {
        "size": 25
      },
      "help_text": "",
      "list_id": "abc123def"
    }
  ],
  "list_id": "abc123def",
  "total_items": 2
}
```

## Common Use Cases

- Getting field metadata to use in forms
- Checking what merge fields are available before adding subscribers
- Retrieving field IDs for use in other Mailchimp operations