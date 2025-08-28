# Add Merge Field to Mailchimp Audience

This action creates a new custom field in your Mailchimp audience (list) to collect additional information from your subscribers.

## When to use this action

Use this action when you need to:
- Add a new field to your Mailchimp audience
- Create custom fields for segmentation
- Collect additional information from subscribers

## Required information

### List Information
- **List ID**: The unique identifier for your Mailchimp audience. You can find this in your Mailchimp account under Audience settings.

### Merge Field Details
- **Field Name**: The name of the field as it will appear in your audience (e.g., "First Name", "Birthday", "Favorite Color")
- **Field Type**: The type of data this field will store (text, number, date, etc.)

### Optional configuration
- **Field Tag**: A short tag used in campaigns (e.g., FNAME, BIRTHDAY). If not provided, Mailchimp will generate one based on the field name.
- **Required Field**: Whether subscribers must fill out this field
- **Default Value**: A value to use if the subscriber doesn't provide one
- **Show on Signup Form**: Whether this field appears on your signup forms
- **Help Text**: Instructions to help subscribers understand what to enter

## Output
The action returns the complete information about the newly created merge field, including its ID and other details.

## Example use cases
- Adding a "Birthday" field to send birthday promotions
- Creating a "Preferences" field to better segment your audience
- Adding custom fields for event registration information