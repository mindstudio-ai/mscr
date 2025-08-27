# Cancel Campaign

This action allows you to cancel a Mailchimp campaign that has already been sent but hasn't reached all recipients yet. This is a **Mailchimp Pro feature** and will not work with standard Mailchimp accounts.

## Prerequisites

- A Mailchimp Pro account
- A campaign that has been sent but hasn't reached all recipients yet
- Your Mailchimp API key and server prefix configured in the connector settings

## Configuration

### Campaign Details

- **Campaign ID**: Enter the unique identifier for the campaign you want to cancel. You can find this in the URL when viewing the campaign in Mailchimp (e.g., `abc123def...`).

### Confirmation

- **Confirmation Message**: Type `CONFIRM` (all caps) to proceed with the cancellation. This is a safety measure since campaign cancellation cannot be undone.
- **Output Variable**: Name of the variable that will store the result message.

## Important Notes

- This action only works for campaigns that have been sent but haven't reached all recipients yet.
- Once a campaign is canceled, it cannot be restarted.
- This feature is only available with Mailchimp Pro accounts.
- Cancellation is not instantaneous - some recipients may still receive the campaign after you cancel it.

## Example Usage

Use this action when you need to urgently stop a campaign that contains an error or was sent prematurely.