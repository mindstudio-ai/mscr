# Create Contact in ActiveCampaign

This action creates a new contact in your ActiveCampaign account.

## Configuration

### Contact Information

- **Email**: The email address of the contact. This is required unless you're creating a phone-only contact.
- **Allow Phone-Only Contact**: Select "Yes" if you want to create a contact with only a phone number and no email.
- **First Name**: The contact's first name.
- **Last Name**: The contact's last name.
- **Phone**: The contact's phone number.

### Custom Fields (Optional)

- **Custom Fields**: If you want to set custom field values, enter them as a JSON array. Each object in the array should have a `field` property (the ID of the custom field) and a `value` property.

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

> **Note**: You must use the custom field ID, not the field name. You can find your custom field IDs in your ActiveCampaign account.

### Output

- **Output Variable**: The name of the variable where the created contact information will be stored.

## Important Notes

- Either an email address or a phone number is required to create a contact.
- If creating a phone-only contact, set "Allow Phone-Only Contact" to "Yes".
- The response will include the created contact's details and any custom field values that were set.