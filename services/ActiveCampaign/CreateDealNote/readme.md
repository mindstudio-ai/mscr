# Create Deal Note

This connector creates a new note for a deal in ActiveCampaign.

## Requirements

- You need an ActiveCampaign account with API access
- Your API Key and Account URL must be configured in the connector settings
- You must have permission to manage deals and the specific pipeline the deal belongs to

## Configuration

### Deal Information
- **Deal ID**: Enter the numeric ID of the deal you want to add a note to. You can find this in the URL when viewing a deal in ActiveCampaign (e.g., "1").

### Note Details
- **Note Content**: Enter the text content for your note. You can add multiple lines of text as needed.

### Output
- **Output Variable**: Name the variable that will store the API response containing the updated deal information.

## Example Usage

1. Enter the Deal ID: `42`
2. Add your note content: `Customer requested a follow-up call next week to discuss pricing options.`
3. Set the output variable name: `dealNoteResult`

The connector will create the note and store the API response in the `dealNoteResult` variable, which you can use in subsequent steps of your workflow.