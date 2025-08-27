# Add Interest in Category

This action creates a new interest (or 'group name') for a specific interest category in a MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API key must be configured in the connection settings
- Your MailChimp server prefix must be configured in the connection settings
- You need to have created a list and an interest category already

## Configuration

### List ID

Enter the unique identifier for your MailChimp list (also called an "audience"). You can find this in your MailChimp account under Audience settings or in the URL when viewing your audience.

Example: `a1b2c3d4e5`

### Interest Category ID

Enter the unique identifier for the interest category where you want to add the new interest. You can find this in your MailChimp account when viewing the interest categories for your list.

Example: `f6g7h8i9j0`

### Interest Name

Enter the name for the new interest you want to create. This is what subscribers will see on your signup forms.

Example: `Product Updates`

### Display Order (Optional)

Enter a number to specify the display order for this interest within its category. If left blank, MailChimp will assign a default order.

Example: `1`

### Output Variable

Specify a variable name to store the response from MailChimp, which will include details about the newly created interest such as its ID, name, and other properties.

## What happens

When this action runs, it will:
1. Connect to your MailChimp account
2. Create a new interest with the specified name in the selected interest category
3. Return the complete interest details including the generated interest ID

## Common uses

- Setting up segmentation options before launching a campaign
- Creating interest options for subscription forms
- Building out your audience organization structure