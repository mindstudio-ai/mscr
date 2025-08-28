# Update Workflow Email

This action allows you to update settings for a classic automation workflow email in MailChimp.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API key must be configured in the environment variables
- Your server prefix (e.g., "us19") must be configured in the environment variables
- This only works with workflows of type: abandonedBrowse, abandonedCart, emailFollowup, or singleWelcome

## Usage

### Workflow Information

- **Workflow ID**: Enter the unique identifier for your automation workflow. You can find this in the URL when viewing your workflow in MailChimp or via the API.
- **Workflow Email ID**: Enter the unique identifier for the specific email within the workflow that you want to update.

### Email Settings

- **Subject Line**: The subject line that will appear in the recipient's inbox
- **Preview Text**: The text that appears in email clients as a preview
- **Title**: The internal title for the automation (not visible to recipients)
- **From Name**: The sender name that will appear in the recipient's inbox
- **Reply To**: The email address that will receive replies

### Delay Settings

These settings control when the email is sent within the automation workflow:

- **Delay Amount**: A number representing the delay quantity (e.g., 1, 2, 3)
- **Delay Type**: The unit of time for the delay (now, day, hour, week)
- **Delay Direction**: Currently only "after" is supported
- **Delay Action**: The trigger event that starts the delay countdown:
  - Signup: After a subscriber joins your list
  - Abandoned Browse: After a subscriber views products but doesn't purchase
  - Abandoned Cart: After a subscriber adds items to cart but doesn't complete checkout

## Output

The action returns the updated workflow email details in the specified output variable.

## Example Use Case

Update the subject line and delay settings for an abandoned cart email to be sent 24 hours after cart abandonment:
- Workflow ID: 4e3f41f35d
- Workflow Email ID: 8a5d3a7b9c
- Subject Line: "Did you forget something in your cart?"
- Delay Amount: 1
- Delay Type: day
- Delay Direction: after
- Delay Action: ecomm_abandoned_cart