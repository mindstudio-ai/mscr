# Batch Subscribe or Unsubscribe Members to a MailChimp List

This action allows you to add or update multiple members to a MailChimp list in a single operation. You can use this to subscribe new members, update existing members, or change their subscription status.

## Configuration

### List Information
- **List ID**: Enter the unique identifier for your MailChimp list (also called an Audience). You can find this in your MailChimp account under Audience settings > Settings > Audience name and defaults.

### Member Options
- **Members**: Enter a JSON array of members to add or update. Each member object must include at least an `email_address` and `status`. 

  Example format:
  ```json
  [
    {
      "email_address": "john@example.com",
      "status": "subscribed",
      "merge_fields": {
        "FNAME": "John",
        "LNAME": "Doe"
      }
    },
    {
      "email_address": "jane@example.com",
      "status": "unsubscribed"
    }
  ]
  ```

  Valid status values:
  - `subscribed`: Active subscriber
  - `unsubscribed`: Unsubscribed member
  - `cleaned`: Email bounced and was removed
  - `pending`: Awaiting confirmation
  - `transactional`: Transactional subscriber only

- **Update Existing**: Choose whether to update existing members' subscription status if they're already in the list.

### Advanced Options
- **Skip Merge Validation**: If set to Yes, member data will be accepted without merge field values, even if the merge field is usually required.
- **Skip Duplicate Check**: If set to Yes, duplicates in your request will be ignored, and only the first instance will be processed.

### Output
- **Output Variable**: Name of the variable that will store the operation results. The results will include information about new members added, members updated, and any errors that occurred.

## Notes
- You can add up to 500 members in a single batch operation.
- Merge fields must match the merge fields configured in your MailChimp list.
- For more details on available fields, refer to the [MailChimp API documentation](https://mailchimp.com/developer/marketing/api/list-members/batch-subscribe-or-unsubscribe/).