# Pause Automation Emails

This connector allows you to pause all emails in a specific Mailchimp automation workflow.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have created at least one automation workflow in Mailchimp
- You need your Mailchimp API key and server prefix configured in the service settings

## Configuration

### Workflow ID

Enter the unique identifier for the automation workflow you want to pause. This is a required field.

To find your workflow ID:
1. Log in to your Mailchimp account
2. Navigate to Automations
3. Select the automation you want to pause
4. The workflow ID is in the URL of the automation page (e.g., `57afe96172`)

## What happens when this connector runs?

When executed, this connector will:
1. Connect to your Mailchimp account
2. Send a request to pause all emails in the specified automation workflow
3. Log a success message when completed

Note: This action doesn't return any data, so there's no output variable. You'll see a success message in the logs when the emails are paused successfully.