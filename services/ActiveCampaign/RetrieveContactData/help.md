# Retrieve Contact Data from ActiveCampaign

This connector retrieves detailed information for a specific contact from your ActiveCampaign account.

## Prerequisites

Before using this connector, you need:
- An ActiveCampaign account
- Your API Key (found in your account under Settings > Developer)
- Your account URL (e.g., https://youraccount.api-us1.com)

## Configuration

### Contact ID
Enter the ID of the contact you want to retrieve data for. This is a numeric identifier that can be found in your ActiveCampaign dashboard when viewing a contact, or from the URL when viewing a contact's details.

Example: `42`

### Output Variable
Specify a name for the variable that will store the retrieved contact data. You can reference this variable in subsequent steps of your workflow.

Example: `contactData`

## Output

The connector returns comprehensive contact data including:
- Basic contact information
- Geographic data (location, timezone, etc.)
- Campaign tracking information
- Social media IDs
- Timestamps for creation and updates

You can access specific fields from the output using dot notation, for example:
- `{{contactData.contactDatum.geoCity}}` - The contact's city
- `{{contactData.contactDatum.tstamp}}` - Timestamp of the contact's last activity