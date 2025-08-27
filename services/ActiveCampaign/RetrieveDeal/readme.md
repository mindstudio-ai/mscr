# Retrieve Deal

This connector retrieves a specific deal from your ActiveCampaign account using its unique ID.

## Prerequisites

Before using this connector, make sure you have:

1. An ActiveCampaign account
2. API access configured in your ActiveCampaign account
3. The API Key and Account URL added to your MindStudio environment variables
4. The ID of the deal you want to retrieve

## Configuration

### Deal Information

- **Deal ID**: Enter the numeric ID of the deal you want to retrieve. You can find deal IDs in your ActiveCampaign dashboard or by using the ActiveCampaign API to list deals.

### Output

- **Output Variable**: Enter a name for the variable that will store the retrieved deal information. This variable will contain all deal details including title, description, value, status, and associated contacts.

## Example Usage

After configuring this connector, you can use the output variable in subsequent steps of your workflow to access deal information.

For example, if your output variable is named `dealInfo`, you can access specific properties like:

- Deal title: `{{dealInfo.deal.title}}`
- Deal value: `{{dealInfo.deal.value}}`
- Deal status: `{{dealInfo.deal.status}}`
- Associated contact ID: `{{dealInfo.deal.contact}}`

## Permissions

This connector requires that your API key has permission to view deals. If the user associated with the API key doesn't have permission to manage the pipeline that the deal belongs to, limited deal data will be returned.