# Update Account Association

This connector allows you to update an existing association between a contact and an account in ActiveCampaign.

## Prerequisites

- You need an ActiveCampaign account with API access
- Your API Key and Account URL must be configured in the connector settings

## Configuration

### Association ID
Enter the ID of the account-contact association you want to update. This is a numeric value that identifies the specific relationship between a contact and an account.

Example: `19`

### Job Title
Enter the new job title for the contact at this account. This will update the contact's role within the specified account.

Example: `Product Manager` or `Chief Marketing Officer`

### Output Variable
Specify a variable name to store the response data. This variable will contain all details of the updated association, including the account ID, contact ID, job title, and timestamps.

## Response

The connector will return the complete details of the updated association, including:

```json
{
  "accountContact": {
    "account": "3",
    "contact": "2",
    "jobTitle": "CEO",
    "createdTimestamp": "2019-06-26T11:26:15-05:00",
    "updatedTimestamp": "2019-06-26T11:29:57-05:00",
    "links": {
      "account": "...",
      "contact": "..."
    },
    "id": "19"
  }
}
```

## Notes

- ActiveCampaign currently allows only a single account per contact
- Only the job title can be updated with this connector
- If the association ID doesn't exist, you'll receive an error