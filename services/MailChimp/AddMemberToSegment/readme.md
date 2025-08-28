# Add Member to Segment - MailChimp

This action adds a subscriber to a static segment (also known as a tag) in your MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- You need to have created a list (audience) and a segment (tag) in MailChimp
- The subscriber's email address should already exist in your list

## Configuration Fields

### List ID

Enter the unique identifier for your MailChimp list (audience). You can find this in your MailChimp account:
1. Go to Audience → All Contacts
2. Click on "Settings" in the dropdown menu
3. Click on "Audience name and defaults"
4. The List ID is shown as "Audience ID" at the bottom of the page

Example: `a1b2c3d4e5`

### Segment ID

Enter the unique identifier for the segment (tag) within your list. To find a segment ID:
1. Go to Audience → All Contacts
2. Click on "Tags" in the left sidebar
3. Find the tag you want to use
4. The Segment ID is in the URL when you click on the tag (e.g., `.../lists/{list_id}/segments/{segment_id}`)

Example: `12345`

### Email Address

Enter the email address of the subscriber you want to add to the segment. The email address must already exist in your list.

Example: `subscriber@example.com`

### Output Variable

Enter a name for the variable that will store the API response. This variable will contain information about the subscriber that was added to the segment.

## Notes

- If the email address is not already in your list, the action will fail
- This action only works with static segments (tags), not with dynamic segments
- The API response will include details about the subscriber such as their status, merge fields, and other subscription information