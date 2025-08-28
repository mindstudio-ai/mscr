# Send Campaign

This action sends a Mailchimp campaign immediately. For RSS Campaigns, the campaign will send according to its schedule.

## Prerequisites

- You need to have already created a campaign in Mailchimp that is ready to send
- You need the Campaign ID from your Mailchimp account

## Configuration

### Campaign Settings

- **Campaign ID**: Enter the unique identifier for your Mailchimp campaign. This can be found in the URL when viewing your campaign in Mailchimp (e.g., `abc123def456`).

### Output

- **Success Message**: Choose a variable name to store the success message after the campaign is sent.

## How to find your Campaign ID

1. Log in to your Mailchimp account
2. Navigate to the Campaigns section
3. Click on the campaign you want to send
4. Look at the URL in your browser - the Campaign ID is the alphanumeric string at the end of the URL
   
   Example: `https://us19.admin.mailchimp.com/campaigns/show/?id=123456` - In this case, `123456` is your Campaign ID.

## Notes

- Once a campaign is sent, it cannot be undone
- Make sure your campaign has passed all of Mailchimp's compliance checks before sending
- This action will return immediately, but the actual delivery of emails may take time depending on the size of your list