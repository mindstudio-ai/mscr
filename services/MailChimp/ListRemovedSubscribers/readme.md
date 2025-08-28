# List Removed Subscribers

This action retrieves information about subscribers who were removed from a Mailchimp automation workflow.

## Configuration

### Workflow ID
Enter the unique identifier for the Mailchimp automation workflow you want to check. You can find your workflow IDs in the Mailchimp dashboard under Automations.

Example: `4e0b8b1a2d`

### Output Variable
Specify a variable name to store the results. The output will contain:

- `workflow_id`: The ID of the workflow you queried
- `subscribers`: An array of subscriber objects who were removed from the workflow
- `total_items`: The total number of removed subscribers

Each subscriber object includes:
- `id`: MD5 hash of the subscriber's email
- `workflow_id`: The workflow ID
- `list_id`: The list ID
- `email_address`: The subscriber's email address

## Prerequisites

Make sure you have set up your Mailchimp environment variables:
- API Key
- Server Prefix (e.g., us19)