# Remove List Member from Segment

This action removes a subscriber from a specific segment in your Mailchimp list/audience.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have configured your Mailchimp API Key and Server Prefix in the connector settings

## Configuration

### List ID
Enter the unique identifier for your Mailchimp list/audience. You can find this in your Mailchimp account by:
1. Going to Audience → All Contacts
2. Click on the "Settings" dropdown
3. Select "Audience name and defaults"
4. The Audience ID is listed as "Audience ID" (looks like: `abc123def`)

### Segment ID
Enter the unique identifier for the segment you want to remove the subscriber from. To find a segment ID:
1. Go to Audience → All Contacts
2. Click on "Segments" in the navigation
3. Click on the segment name
4. The segment ID is in the URL: `https://us19.admin.mailchimp.com/lists/segments/12345` (where `12345` is the segment ID)

### Subscriber Email
Enter the email address of the subscriber you want to remove from the segment. The email must match exactly the one stored in your Mailchimp audience.

## What happens when this action runs?

When this action runs, it will:
1. Convert the subscriber's email to the format Mailchimp requires
2. Remove the subscriber from the specified segment
3. Return a success message if the operation completes successfully

Note: This action only removes the subscriber from the segment, not from your entire audience.