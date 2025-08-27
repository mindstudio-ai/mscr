# Update Contact in ActiveCampaign

This connector allows you to update an existing contact in your ActiveCampaign account.

## Prerequisites
- You need your ActiveCampaign API Key and Account URL (configured in the service settings)
- You need the ID of the contact you want to update

## Configuration

### Contact Information
- **Contact ID**: The unique identifier of the contact you want to update. This is required and can be found in your ActiveCampaign account or via the API.
- **Email Address**: The contact's email address. Leave blank if you don't want to update this field.
- **First Name**: The contact's first name. Leave blank if you don't want to update this field.
- **Last Name**: The contact's last name. Leave blank if you don't want to update this field.
- **Phone Number**: The contact's phone number. Leave blank if you don't want to update this field.

### Custom Fields (Optional)
- **Custom Fields**: A JSON array of custom field values to update. Each item should have a `field` (the ID of the custom field) and a `value` (the new value).

Example:
```json
[
  {
    "field": "1",
    "value": "The Value for First Field"
  },
  {
    "field": "6",
    "value": "2008-01-20"
  }
]
```

### Output
- **Output Variable**: The name of the variable where the updated contact information will be stored.

## Notes
- Only the fields you provide will be updated. Leave fields blank if you don't want to change them.
- Custom field IDs can be found in your ActiveCampaign account under "Settings" > "Field Editor".
- The output will contain the updated contact information returned by ActiveCampaign.