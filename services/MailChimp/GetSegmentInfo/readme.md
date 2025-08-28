# Get Segment Info

This action retrieves detailed information about a specific segment from a MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- You need to have configured your MailChimp API Key and Server Prefix in the connector settings
- You need to have at least one list (audience) with segments created

## Required Parameters

### List ID
Enter the unique identifier for the list (audience) that contains the segment. You can find this in your MailChimp account by:
1. Going to Audience → All Contacts
2. Click on Settings → Audience name and defaults
3. Look for "Audience ID" at the bottom of the page

### Segment ID
Enter the unique identifier for the segment. You can find this by:
1. Going to Audience → All Contacts
2. Click on "View Segments"
3. Find your segment and look at the URL when you click on it - the segment ID will be in the URL

## Optional Parameters

### Include Cleaned Members
Choose whether to include contacts that have been cleaned (emails that have bounced) in the response.

### Include Transactional Members
Choose whether to include transactional members in the response.

### Include Unsubscribed Members
Choose whether to include unsubscribed members in the response.

## Output

The action will return detailed information about the segment including:
- Segment ID
- Name
- Member count
- Type (saved, static, fuzzy)
- Creation and update dates
- Segment conditions (if applicable)

This information will be stored in the output variable you specify.