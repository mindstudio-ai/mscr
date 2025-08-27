# List Automated Email Subscribers

This action retrieves information about subscribers who are queued to receive a specific automated email within a MailChimp automation workflow.

## Prerequisites

- You need a MailChimp account with API access
- You must have created an automation workflow in MailChimp
- You need to know both the Workflow ID and the specific Email ID within that workflow

## Configuration

### Workflow ID

Enter the unique identifier for your automation workflow. You can find this in the URL when viewing your automation in MailChimp, or via the MailChimp API.

Example: `4e0b0b1a0f`

### Workflow Email ID

Enter the unique identifier for the specific email within your automation workflow. This can be found in the URL when editing the specific email in your workflow, or via the MailChimp API.

Example: `8a5ce2c252`

## Output

The action will return detailed information about subscribers in the email queue, including:

- Email addresses of subscribers
- Next scheduled send times
- Total number of subscribers in the queue
- Additional subscriber details

This information will be stored in the output variable you specify.