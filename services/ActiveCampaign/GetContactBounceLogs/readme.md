# Retrieve Contact Bounce Logs

This action retrieves the bounce logs for a specific contact in your ActiveCampaign account.

## When to use this action

Use this action when you need to:
- Check if a contact's emails have bounced
- Monitor email delivery issues for specific contacts
- Troubleshoot email campaign performance issues
- Gather data about bounce patterns for analysis

## Required inputs

### Contact ID
Enter the numeric ID of the contact whose bounce logs you want to retrieve. You can find a contact's ID in ActiveCampaign by:
1. Going to the Contacts section
2. Opening the contact's profile
3. Looking at the URL - the number after "contact/" is the contact ID

Example: `42`

### Output Variable
Enter a name for the variable that will store the bounce logs data. You can reference this variable in subsequent actions.

Example: `contactBounceLogs`

## Output

The action returns an array of bounce log objects with details about each bounce event, including:
- Timestamp of the bounce
- Email address that bounced
- Campaign and message information
- Error details
- Source information

Example output:
```json
[
  {
    "tstamp": "2021-05-12T11:30:06-05:00",
    "bounceid": "1",
    "email": "example@domain.com",
    "error": "Connection refused",
    "id": "23",
    "campaign": "11"
    // additional fields...
  },
  // more bounce logs...
]
```

If the contact has no bounce logs, the action will return an empty array.