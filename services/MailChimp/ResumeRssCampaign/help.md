# Resume RSS Campaign

This action resumes a previously paused RSS-driven campaign in MailChimp.

## Prerequisites

- You need a valid MailChimp API key configured in your service settings
- You need to know the Campaign ID of the RSS-driven campaign you want to resume
- The campaign must be an RSS-driven campaign that is currently paused

## Configuration

### Campaign ID

Enter the unique identifier for the campaign you want to resume. You can find this ID in your MailChimp account or via the MailChimp API.

Example: `b93e868e8f`

### Success Variable

Enter a name for the variable that will store the success status of the operation. This variable will be set to a success message if the campaign is resumed successfully.

## Notes

- This action only works with RSS-driven campaigns
- The campaign must be in a paused state to be resumed
- If the campaign is not paused or is not an RSS-driven campaign, the API will return an error
