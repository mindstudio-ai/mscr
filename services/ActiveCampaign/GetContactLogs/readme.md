# Get Contact Logs

This connector retrieves activity logs for a specific contact in your ActiveCampaign account.

## Prerequisites
- An ActiveCampaign account
- API Key and Account URL configured in the ActiveCampaign service settings

## Configuration

### Contact ID
Enter the numeric ID of the contact whose logs you want to retrieve. You can find a contact's ID in ActiveCampaign by:
1. Going to your Contacts list
2. Clicking on a contact
3. Looking at the URL - the number after "contact/" is the contact ID (e.g., `https://youraccountname.activehosted.com/app/contacts/1234` means the contact ID is 1234)

### Output Variable
Enter a name for the variable that will store the contact logs. This variable will contain an array of log entries for the specified contact.

## Output Example

The output will be an array of contact logs with details about each activity:

```json
[
  {
    "id": "123",
    "type": "email",
    "date": "2023-09-15T14:30:00-05:00",
    "subject": "Newsletter opened",
    "details": "Contact opened email campaign XYZ"
  },
  {
    "id": "124",
    "type": "form",
    "date": "2023-09-10T09:15:00-05:00",
    "subject": "Form submission",
    "details": "Contact submitted form ABC"
  }
]
```

Note: The actual structure of the logs will depend on the ActiveCampaign API response format.