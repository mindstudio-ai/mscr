# Delete Workflow Email

This connector allows you to delete an individual classic automation workflow email from your MailChimp account.

## Prerequisites

- You need a MailChimp account with API access
- You need to have existing automation workflows set up
- You need to know both the Workflow ID and Workflow Email ID you want to delete

## Important Notes

- This action permanently deletes a workflow email - this cannot be undone
- Emails from certain workflow types cannot be deleted, including:
  - Abandoned Cart Email (abandonedCart)
  - Product Retargeting Email (abandonedBrowse)

## Configuration

### Workflow ID

Enter the unique identifier for the automation workflow that contains the email you want to delete. This is typically a string of numbers and letters (e.g., `57afe96172`).

You can find this ID in the URL when viewing your automation in MailChimp, or via the MailChimp API.

### Workflow Email ID

Enter the unique identifier for the specific email within the workflow that you want to delete. This is also typically a string of numbers and letters (e.g., `8a5d3a2b76`).

## What Happens

When this action runs:
- The specified workflow email will be permanently deleted from your MailChimp account
- If successful, the action will complete silently (no output is returned)
- If there's an error, the action will fail with a descriptive error message