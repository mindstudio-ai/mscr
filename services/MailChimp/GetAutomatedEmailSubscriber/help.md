# Get Automated Email Subscriber

This connector retrieves information about a specific subscriber in a classic automation email queue from MailChimp.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API key must be configured in the service settings
- Your server prefix (e.g., us19) must be configured in the service settings

## Configuration

### Workflow ID

Enter the unique identifier for the Automation workflow. You can find this in the URL when viewing an automation in MailChimp or via the API.

Example: `57afe96172`

### Workflow Email ID

Enter the unique identifier for the specific email within the Automation workflow. This can be found via the MailChimp API or in the URL when editing a specific email in an automation.

Example: `8a5d66a273`

### Subscriber Hash

Enter the MD5 hash of the lowercase version of the list member's email address. You can generate this using an MD5 hash generator with the subscriber's email address in lowercase.

Example: `62eeb292278cc15f5817cb78f7790b08`

For the email address `example@domain.com`, the MD5 hash would be `62eeb292278cc15f5817cb78f7790b08`.

### Output Variable

Enter a name for the variable that will store the response data. This variable will contain all the information about the subscriber in the automation email queue, including their email address, next send date, and related workflow information.

## Response Data

The connector returns detailed information about the subscriber, including:

- Email hash (ID)
- Workflow ID
- Email ID
- List ID
- List status
- Email address
- Next send date/time
- Related links