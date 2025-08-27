# Get Custom Field

This connector retrieves a specific custom field from your Beehiiv publication.

## Required Information

### Publication ID
Enter your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard URL or in the publication settings.

Example: `pub_12345abcde67890fghij`

### Custom Field ID
Enter the ID of the custom field you want to retrieve. This is typically a UUID format.

Example: `00000000-0000-0000-0000-000000000000`

### Output Variable
Enter a name for the variable that will store the custom field data. This variable will contain a JSON object with the custom field's details.

## Response Format

The output variable will contain a JSON object with the following structure:

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "kind": "string",
  "display": "Display Name",
  "created": 1672531200
}
```

## Authentication

This connector uses your Beehiiv API key which should be configured in the connector settings.