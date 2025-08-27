# Add Contact to Automation

This connector adds an existing contact to an automation in ActiveCampaign.

## Prerequisites

1. You need an ActiveCampaign account with API access
2. You need to have your API Key and Account URL configured in the service settings
3. You need the ID of an existing contact and automation

## Configuration

### Contact Information

- **Contact ID**: Enter the numeric ID of the existing contact you want to add to the automation. 
  Example: `117`

### Automation Information

- **Automation ID**: Enter the numeric ID of the automation you want to add the contact to.
  Example: `42`

### Output

- **Output Variable**: Name of the variable that will store the API response.

## How to find Contact and Automation IDs

- **Contact ID**: You can find a contact's ID in the URL when viewing a contact in ActiveCampaign. For example, if the URL is `https://youraccountname.activehosted.com/contact/1`, the contact ID is `1`.

- **Automation ID**: You can find an automation's ID in the URL when viewing an automation in ActiveCampaign. For example, if the URL is `https://youraccountname.activehosted.com/automation/overview/42`, the automation ID is `42`.

## Response

The connector will return the full API response which includes details about the contact and the automation they were added to.