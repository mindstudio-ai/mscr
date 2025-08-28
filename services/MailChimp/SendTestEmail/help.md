# Send Test Email for MailChimp Campaign

This action allows you to send a test email for a specific MailChimp campaign before sending it to your actual audience.

## Prerequisites

- You need a MailChimp account with API access
- You must have already created a campaign in MailChimp
- You need to know the Campaign ID for the campaign you want to test

## Configuration

### Campaign Details

- **Campaign ID**: Enter the unique identifier for your campaign. You can find this in the URL when viewing your campaign in MailChimp or via the MailChimp API.

### Test Email Settings

- **Test Email Addresses**: Enter the email addresses that should receive the test email. Separate multiple addresses with commas.
  
  Example:
  ```
  test@example.com, marketing@yourcompany.com
  ```

- **Email Format**: Choose whether to send the test as HTML (with formatting) or Plain Text.

### Result

- **Success Variable**: Choose a name for the variable that will store whether the operation was successful (true) or not (false).

## What happens when this runs?

When this action runs, it will:

1. Connect to your MailChimp account
2. Send a test version of your campaign to the specified email addresses
3. Set your success variable to `true` if the test was sent successfully

## Troubleshooting

If you encounter errors:

- Verify your Campaign ID is correct
- Ensure all email addresses are valid
- Check that your MailChimp API key and server prefix are correctly configured in the service settings