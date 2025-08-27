# Sync Contact with ActiveCampaign

This connector allows you to create a new contact or update an existing contact in ActiveCampaign. The system will automatically determine whether to create or update based on the email address you provide.

## How it works

When you provide an email address:
- If a contact with that email already exists in ActiveCampaign, it will be updated with the information you provide
- If no contact with that email exists, a new contact will be created

## Required Fields

- **Email**: The email address of the contact you want to create or update. This is the unique identifier used to match existing contacts.
- **Output Variable**: Name of the variable where the API response will be stored for use in later steps.

## Optional Fields

- **First Name**: The contact's first name
- **Last Name**: The contact's last name
- **Phone**: The contact's phone number

## Custom Fields

You can update custom fields by providing a JSON array in the following format:

```json
[
  {
    "field": "1",
    "value": "Custom field value"
  },
  {
    "field": "6",
    "value": "2023-01-20"
  }
]
```

Each object in the array needs:
- `field`: The ID of the custom field in ActiveCampaign (not the name)
- `value`: The value you want to set for this field

## Output

The connector will return the complete contact object from ActiveCampaign, including all field values that were updated or created.