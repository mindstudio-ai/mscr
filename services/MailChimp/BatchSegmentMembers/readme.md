# Batch Segment Members

This connector allows you to add or remove multiple members to/from a static segment in a MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- You need to know your List ID and Segment ID
- Your MailChimp API Key and Server Prefix must be configured in the service settings

## Configuration

### Segment Information

- **List ID**: Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account under Lists > Settings > List name and defaults.
- **Segment ID**: Enter the unique identifier for your segment. You can find this in the URL when viewing a segment in MailChimp.

### Member Management

- **Members to Add**: Enter the email addresses you want to add to the segment. You can enter them:
  - One email per line
  - As a comma-separated list
  - Maximum 500 emails

  Example:
  ```
  user1@example.com
  user2@example.com
  user3@example.com
  ```
  or `user1@example.com, user2@example.com, user3@example.com`

- **Members to Remove**: Enter the email addresses you want to remove from the segment. Format them the same way as Members to Add.

### Output

- **Output Variable**: Enter a name for the variable that will store the results of this operation.

## Notes

- You must provide at least one of "Members to Add" or "Members to Remove"
- The API will ignore any email addresses that are not already subscribed to your list
- The output will contain details about how many members were added/removed and any errors that occurred