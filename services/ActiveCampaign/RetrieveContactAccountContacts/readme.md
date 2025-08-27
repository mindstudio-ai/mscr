# Retrieve Contact Account Contacts

This connector retrieves all account contacts associated with a specific contact in your ActiveCampaign account.

## Prerequisites

- You need your ActiveCampaign API Key and Account URL configured in the ActiveCampaign service settings.

## Configuration

### Contact Details

- **Contact ID**: Enter the numeric ID of the contact for which you want to retrieve associated account contacts. This is the unique identifier for the contact in your ActiveCampaign account.

### Output

- **Output Variable**: Enter a name for the variable that will store the retrieved account contacts. This variable will contain an array of account contact objects.

## Output Format

The output will be an array of account contact objects with the following structure:

```json
[
  {
    "account": "9",
    "contact": "7",
    "jobTitle": "",
    "createdTimestamp": "2021-05-21T16:30:23-05:00",
    "updatedTimestamp": "2021-05-21T16:30:23-05:00",
    "id": "7"
  }
]
```

## Example Usage

After running this connector, you can use the output variable in subsequent steps of your workflow to access the account contacts data. For example, if your output variable is named `accountContacts`, you can access the first account contact's ID using `{{accountContacts[0].id}}`.