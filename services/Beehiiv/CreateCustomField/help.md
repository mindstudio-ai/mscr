# Create Custom Field

This action creates a custom field for your Beehiiv publication. Custom fields allow you to store additional information about your subscribers, which can be useful for segmentation and personalization.

## Configuration

### Publication Details

- **Publication ID**: Enter your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard under Publication Settings.

### Custom Field Details

- **Field Type**: Select the type of data this custom field will store:
  - **Text**: For storing names, descriptions, or other text values
  - **Number**: For storing numeric values like age or score
  - **Boolean**: For storing yes/no or true/false values
  - **Date**: For storing dates

- **Display Name**: Enter a descriptive name for your custom field as it will appear in your Beehiiv dashboard. For example: "Company Name", "Subscription Tier", or "Signup Source".

### Output

- **Output Variable**: The name of the variable that will store information about the created custom field, including its ID, type, display name, and creation timestamp.

## Example Response

The output variable will contain data similar to:

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "kind": "string",
  "display": "Company Name",
  "created": 1672531200
}
```

## Notes

- You'll need a valid Beehiiv API key configured in your environment variables.
- Custom fields cannot be deleted once created, so choose your field names carefully.
- The field ID returned in the response can be used in other Beehiiv operations that require a custom field ID.