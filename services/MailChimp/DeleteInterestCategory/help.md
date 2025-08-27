# Delete Interest Category

This connector allows you to delete a specific interest category from a MailChimp list (audience).

## Prerequisites

- You must have a MailChimp account with API access
- You need to have configured your MailChimp API Key and Server Prefix in the connector settings

## Configuration

### List ID

Enter the unique identifier for the MailChimp list (audience) that contains the interest category you want to delete. 

You can find your List ID by:
1. Logging into your MailChimp account
2. Going to Audience > All Contacts
3. Click on "Settings" and then "Audience name and defaults"
4. The Audience ID is displayed at the bottom of the page (it looks like: `a1b2c3d4e5`)

### Interest Category ID

Enter the unique identifier for the interest category you want to delete.

You can find the Interest Category ID by:
1. Going to your audience in MailChimp
2. Clicking on "Manage Audience" > "Signup forms" > "Form builder"
3. Click on an interest category field
4. The ID will be visible in the URL or in the field settings

## What happens when this connector runs?

This connector permanently deletes the specified interest category from your MailChimp list. This action cannot be undone, so use it with caution.

If successful, the connector will return a success message. If there's an error (such as the interest category not existing), the connector will return an error message.
