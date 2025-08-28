# Start Automated Email

This action allows you to start a specific automated email within a MailChimp automation workflow.

## Prerequisites

- You need a MailChimp account with API access
- You must have already created an automation workflow in MailChimp
- You need to know the IDs of both the workflow and the specific email within that workflow

## Configuration

### Workflow ID
Enter the unique identifier for your automation workflow. You can find this in the URL when viewing your automation in MailChimp or via the MailChimp API.

Example: `4e0b0b1a01`

### Workflow Email ID
Enter the unique identifier for the specific email within your automation workflow. You can find this in the URL when editing the specific email in your automation or via the MailChimp API.

Example: `8a5ce2c112`

## How It Works

When this action runs, it will trigger the specified email in your automation workflow to start sending. This is useful for programmatically activating specific emails in your automation sequences based on custom logic or events in your application.

## Finding Your IDs

1. **Workflow ID**: In the MailChimp interface, navigate to Automations. Click on your automation workflow. The ID is in the URL: `https://us19.admin.mailchimp.com/campaigns/edit?id=WORKFLOW_ID`

2. **Workflow Email ID**: Click on the specific email within your automation. The email ID is in the URL: `https://us19.admin.mailchimp.com/campaigns/edit?id=WORKFLOW_ID&email=WORKFLOW_EMAIL_ID`

Alternatively, you can use the MailChimp API to list all your automations and their emails to find these IDs.