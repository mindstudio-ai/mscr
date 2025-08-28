# Get List Merge Field

This action retrieves detailed information about a specific merge field from a Mailchimp audience (list).

## When to use this action

Use this action when you need to:
- Get information about a specific merge field in your Mailchimp audience
- Check the configuration of a merge field (type, options, etc.)
- Verify if a merge field exists and its properties

## Required inputs

- **List ID**: The unique identifier for your Mailchimp audience/list. You can find this in your Mailchimp account under Audience settings.
- **Merge Field ID**: The numeric ID of the merge field you want to retrieve information about.
- **Output Variable**: Name of the variable where the merge field information will be stored.

## Optional inputs

- **Fields to Include**: A comma-separated list of specific fields you want to include in the response. For example: `merge_id,tag,name,type`
- **Fields to Exclude**: A comma-separated list of fields you want to exclude from the response. For example: `_links,options`

## Output

The action returns detailed information about the merge field in the specified output variable. The response includes:

- `merge_id`: The unique ID of the merge field
- `tag`: The merge tag used in campaigns (e.g., *|FNAME|*)
- `name`: The human-readable name of the field
- `type`: The field type (text, number, address, etc.)
- `required`: Whether the field is required
- `default_value`: The default value for the field
- And other properties depending on the field type

## Example

If you want to get information about a text field that stores a customer's first name:

- **List ID**: `a1b2c3d4e5`
- **Merge Field ID**: `1`
- **Output Variable**: `firstNameField`

The action will return information about the merge field in the `firstNameField` variable, which you can use in subsequent actions.