# Get Removed Subscriber from MailChimp Workflow

This action retrieves information about a specific subscriber who was removed from a classic automation workflow in MailChimp.

## Prerequisites

- You need a MailChimp account with API access
- You need to have configured your MailChimp API Key and Server Prefix in the connector settings

## Configuration

### Workflow ID

Enter the unique identifier for the Automation workflow. You can find this in the URL when viewing the workflow in MailChimp, or via the MailChimp API.

Example: `860e29eaea`

### Subscriber Hash

Enter the MD5 hash of the lowercase version of the list member's email address. You can generate this hash using an MD5 generator with the subscriber's email address in lowercase.

Example: If the email is `example@email.com`, the hash would be `23463b99b62a72f26ed677cc556c44e8`

### Output Variable

The name of the variable where the subscriber information will be stored. This will contain details such as:

- Email address
- Workflow ID
- List ID
- Other subscriber information

## Usage Tips

- Make sure you have the correct permissions in your MailChimp account to access automation workflows
- The subscriber must have been previously removed from the specified workflow
- If you don't know the subscriber hash, you can generate it using an MD5 hash generator with the lowercase email address