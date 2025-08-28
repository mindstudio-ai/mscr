# Archive Automation

This action allows you to permanently archive a MailChimp automation workflow. Archiving will end your automation while preserving all report data. Once archived, you can replicate the automation, but you cannot restart it.

## Prerequisites

- You need a MailChimp account with API access
- You must have the appropriate permissions to manage automations
- The automation workflow must exist in your account

## Configuration

### Workflow ID

Enter the unique identifier for the automation workflow you want to archive. This ID can be found:

- In the URL when viewing the automation in MailChimp (e.g., `https://us19.admin.mailchimp.com/automations/edit?id=123456` - where `123456` is the ID)
- Via the MailChimp API when listing your automations
- In the URL parameters when editing the automation

Example: `12345abcde`

## Important Notes

- This action is **permanent** and cannot be undone
- Archiving is different from pausing - a paused automation can be restarted, but an archived one cannot
- The archived automation's report data will still be accessible in your MailChimp account
- You will receive no content in the response when the action succeeds (HTTP 204)