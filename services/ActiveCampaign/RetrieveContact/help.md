# Retrieve Contact from ActiveCampaign

This action retrieves detailed information about a contact from your ActiveCampaign account using the contact's ID.

## Prerequisites

Before using this action, make sure you have:

1. An ActiveCampaign account
2. API credentials configured in your connector settings:
   - **API Key**: Found in your ActiveCampaign account under Settings → Developer
   - **Base Account URL**: Your account URL (e.g., https://youraccount.api-us1.com)

## Configuration

### Contact ID

Enter the numeric ID of the contact you want to retrieve. You can find a contact's ID in several ways:
- In the URL when viewing a contact in ActiveCampaign (e.g., `.../contact/view/1`)
- From the API response of other ActiveCampaign actions
- From exported contact data

Example: `42`

### Output Variable

Specify a name for the variable that will store the retrieved contact information. This variable will contain all contact details including:
- Basic information (name, email, phone)
- Custom field values
- Associated deals
- List memberships
- Automation enrollments
- And more

You can reference this variable in subsequent steps of your workflow.

## Example Usage

After retrieving a contact, you might want to:
- Extract specific information like `{{outputs.contactData.contact.email}}`
- Check if the contact is part of a specific list
- Make decisions based on contact properties
- Update the contact with new information

## Troubleshooting

If you encounter errors:
- Verify the Contact ID exists in your ActiveCampaign account
- Check your API credentials are correctly configured
- Ensure your account has permission to access contact data