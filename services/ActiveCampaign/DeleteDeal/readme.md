# Delete Deal

This action deletes an existing deal in ActiveCampaign by its ID.

## Prerequisites

- You need an ActiveCampaign account with appropriate permissions:
  - Deal permission: you should have permission to manage deals
  - Deal delete permission: you should have permission to delete deals
- Your API Key and Account URL must be configured in the connector settings

## Configuration

### Deal Information

- **Deal ID**: Enter the numeric ID of the deal you want to delete. You can find the deal ID in the URL when viewing a deal in ActiveCampaign or via the API.

### Response

- **Success Message Variable**: Enter a name for the variable that will store the success message after the deal is deleted. You can reference this variable in subsequent steps of your workflow.

## Notes

- This action permanently deletes the deal and cannot be undone
- If the deal ID doesn't exist, the connector will return an error

## Example Usage

1. Find the deal ID from ActiveCampaign
2. Configure this action with the deal ID
3. Use the success message in subsequent steps to confirm the deletion was successful