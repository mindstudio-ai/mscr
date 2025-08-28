# Add Member to MailChimp List

This connector adds a new subscriber to a MailChimp list (audience).

## Configuration

### List Information
- **List ID**: Enter the unique identifier for your MailChimp list/audience. You can find this in your MailChimp account under Audience settings > Settings > Audience name and defaults.

### Member Information
- **Email Address**: The subscriber's email address you want to add to the list.
- **Subscription Status**: Choose the initial status for the subscriber:
  - **Subscribed**: Actively subscribed to your list
  - **Pending**: Requires confirmation via double opt-in
  - **Unsubscribed**: Contact who has unsubscribed
  - **Cleaned**: Email address that has hard bounced
  - **Transactional**: Contact who can only receive transactional emails
- **Email Type**: The format of emails the subscriber prefers to receive (HTML or Text).
- **Merge Fields (JSON)**: Optional JSON object containing merge field values for the subscriber. These must match the merge fields configured in your MailChimp audience.

  Example:
  ```json
  {"FNAME":"John", "LNAME":"Doe", "BIRTHDAY":"01/01/1990"}
  ```

- **Tags**: Optional comma-separated list of tags to apply to this member.

  Example:
  ```
  new,website,spring2023
  ```

### Output
- **Output Variable**: Name of the variable that will store the response data from MailChimp, including the member's ID and other details.

## Notes
- If the email address already exists in the list, MailChimp will update the existing member with the new information.
- For double opt-in lists, setting status to "pending" will trigger a confirmation email to the subscriber.