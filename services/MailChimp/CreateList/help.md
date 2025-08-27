# Creating a Mailchimp List

This connector creates a new subscriber list (audience) in your Mailchimp account.

## Prerequisites

- A Mailchimp account with API access
- Your Mailchimp API key and server prefix configured in the service settings

## Configuration Guide

### List Details

- **List Name**: Enter a descriptive name for your list (e.g., "Newsletter Subscribers", "Product Updates")
- **Permission Reminder**: This text reminds subscribers how they signed up for your emails. It appears in the footer of your campaigns.
  - Example: "You're receiving this email because you signed up for our newsletter on our website."
- **Email Type Option**: Choose whether subscribers can select between HTML and plain-text emails.
  - Select "Yes" to give subscribers this choice
  - Select "No" to send HTML emails with plain-text backups automatically

### Contact Information

This information is required by law to appear in the footer of your email campaigns:

- **Company**: Your organization's name
- **Address Line 1**: Your physical mailing address
- **City**: City of your business location
- **State/Province**: Optional, but recommended for complete address
- **Postal Code**: Optional, but recommended for complete address
- **Country**: Two-letter country code (e.g., "US" for United States, "GB" for United Kingdom)

### Campaign Defaults

These settings determine the default values for new campaigns created using this list:

- **From Name**: The sender name that appears in subscribers' inboxes (e.g., "Your Company" or "Jane Smith")
- **From Email**: The email address campaigns will be sent from (must be verified in Mailchimp)
- **Default Subject**: A template for campaign subject lines
- **Language**: The default language code for this list (e.g., "en" for English, "es" for Spanish)

### Output

- **Output Variable**: Name of the variable that will store information about the newly created list, including its unique ID

## After Creation

Once your list is created, you can:
- Add subscribers to the list using the "Add Subscriber to List" action
- Create and send campaigns to the list
- Access the list in your Mailchimp dashboard