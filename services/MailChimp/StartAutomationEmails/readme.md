# Start Automation Emails

This connector starts all emails in a classic MailChimp automation workflow.

## When to use this connector

Use this connector when you want to:
- Activate all emails in an existing automation workflow
- Trigger email sequences to begin sending to subscribers
- Resume a paused automation

## Required information

### Workflow ID
Enter the unique identifier for your MailChimp automation workflow. This is a string of characters that identifies your specific automation.

To find your Workflow ID:
1. Log in to your MailChimp account
2. Navigate to Automations
3. Select the automation you want to work with
4. The Workflow ID will be in the URL (e.g., `57afe96172`)

### Success Message Variable
Enter a name for the variable that will store the success message after the operation completes. You can reference this variable in subsequent steps of your workflow.

## Notes
- This action only works with classic automation workflows in MailChimp
- All emails in the workflow will be started (activated)
- Your MailChimp API key and server prefix must be configured in the connector settings