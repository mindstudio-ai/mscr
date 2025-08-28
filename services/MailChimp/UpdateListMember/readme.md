# Update List Member

This action updates information for a specific member of a MailChimp list.

## Required Fields

- **List ID**: The unique identifier for your MailChimp list. You can find this in your MailChimp account under Lists > Settings > List name and defaults.
- **Subscriber Email**: The email address of the subscriber you want to update.
- **Output Variable**: Name of the variable where the updated member information will be stored.

## Optional Fields

### Email and Status

- **Email Type**: Choose whether the subscriber receives HTML or Text emails.
- **Status**: Update the subscriber's status in your list.

### Merge Fields

Merge fields are custom fields you've defined in your MailChimp list (like first name, last name, etc.).

Enter a JSON object where the keys are your merge tags and the values are what you want to update them to:

```json
{
  "FNAME": "John",
  "LNAME": "Doe",
  "BIRTHDAY": "01/01/1990"
}
```

### Additional Settings

- **VIP Status**: Mark or unmark a subscriber as a VIP.
- **Language**: Set the subscriber's language preference using an ISO code (e.g., "en" for English, "es" for Spanish).
- **Skip Merge Validation**: If set to "Yes", MailChimp will accept the update even if required merge fields are missing.

## Output

The action will return the updated member information in the specified output variable, including their current status, merge fields, and other details.