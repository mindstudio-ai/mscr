# Update Mailchimp Merge Field

This action allows you to update an existing merge field (custom field) in a Mailchimp audience (list).

## Prerequisites

- You need a Mailchimp account with API access
- You need to have configured your Mailchimp API Key and Server Prefix in the connector settings
- You need to know the List ID and Merge Field ID you want to update

## Configuration

### List Information

- **List ID**: Enter the unique identifier for your Mailchimp audience (list). You can find this in your Mailchimp account under Audience settings or in the URL when viewing your audience.
- **Merge Field ID**: Enter the ID of the merge field you want to update. This is a numeric value you can find by viewing the merge field details in your Mailchimp account.

### Merge Field Details

- **Field Name** (Required): The name of the merge field as it will appear in your Mailchimp audience.
- **Merge Tag**: The tag used in Mailchimp campaigns (e.g., `FNAME` for First Name). If not provided, the existing tag will be kept.
- **Required Field**: Select whether this field is required when contacts are added to your list.
- **Default Value**: The default value to use when a contact doesn't have a value for this field.
- **Public Field**: Select whether this field should be visible on signup forms.
- **Display Order**: A number indicating the order in which this field appears on forms (lower numbers appear first).
- **Help Text**: Additional text that helps subscribers understand what to enter in this field.

### Response

- **Output Variable**: Name of the variable that will store the response from Mailchimp, containing the updated merge field details.

## Example Use Cases

- Updating a merge field's name or display settings
- Making a field required or optional
- Changing the default value or help text for a field
- Adjusting the display order of fields on your signup forms

## Notes

- You cannot change the field type (e.g., from text to number) using this action
- Some fields like "tag" have format restrictions in Mailchimp (all caps, no spaces)
- The Merge Field ID is different from the Merge Tag - make sure you're using the numeric ID