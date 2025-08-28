# Publish Mailchimp Survey

This action publishes a survey in Mailchimp that is currently in draft, unpublished, or has been previously published and edited.

## Prerequisites

- You need a Mailchimp account with API access
- You must have already created a survey in Mailchimp that is ready to be published
- You need to know your List ID and Survey ID

## Configuration

### List ID

Enter the unique identifier for your Mailchimp audience (list). You can find this in your Mailchimp account:

1. Go to Audience → All Contacts
2. Click on the "Settings" dropdown
3. Select "Audience name and defaults"
4. The Audience ID is shown at the bottom of the page (it looks like: `a1b2c3d4e5`)

### Survey ID

Enter the unique identifier for the survey you want to publish. To find your Survey ID:

1. Go to the survey in your Mailchimp account
2. Look at the URL in your browser - the Survey ID is typically in the URL path
3. It will look something like: `abc123def456`

### Output Variable

Enter a name for the variable that will store the result of this operation. You can use this variable in subsequent steps of your workflow to check if the survey was successfully published.

## Example Usage

This action is useful when you want to:
- Automatically publish surveys after they've been created or updated
- Schedule survey publications as part of a marketing campaign
- Trigger survey publications based on specific events in your workflow

## Notes

- The survey must already exist in your Mailchimp account
- The survey must be in a state that allows publishing (draft, unpublished, or previously published)
- You must have sufficient permissions in your Mailchimp account to publish surveys