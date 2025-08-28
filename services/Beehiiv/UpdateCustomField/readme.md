# Update Custom Field

This action allows you to update an existing custom field for a publication in Beehiiv.

## Required Information

### Publication ID
Enter your Beehiiv publication ID, which starts with `pub_` followed by a string of characters.
Example: `pub_123456789abcdef`

### Custom Field ID
Enter the ID of the custom field you want to update. You can find this in your Beehiiv dashboard or by first listing your custom fields.

### Display Name
Enter the new display name you want to assign to the custom field. This is what will be shown to your subscribers.

### Output Variable
Enter a name for the variable that will store the updated custom field information. You can reference this variable in subsequent steps of your workflow.

## Output

The action will return an object containing:
- `id`: The ID of the custom field
- `kind`: The type of custom field
- `display`: The updated display name
- `created`: Timestamp of when the field was created

## Example Response

```json
{
  "id": "custom_field_123",
  "kind": "string",
  "display": "New Field Name",
  "created": 1672531200
}
```