# Add or Update List Member

This connector adds a new subscriber to a MailChimp list or updates an existing subscriber's information.

## Configuration

### List Information
- **List ID**: Enter your MailChimp list/audience ID. You can find this in your MailChimp account under Audience → Settings → Audience name and defaults.
- **Email Address**: The email address of the subscriber you want to add or update.
- **Status**: Select the subscription status for this member:
  - **Subscribed**: Active subscriber who has opted in
  - **Unsubscribed**: Contact who has opted out
  - **Pending**: Contact who hasn't confirmed their opt-in
  - **Cleaned**: Email address that has hard bounced
  - **Transactional**: Contact who can only receive transactional emails

### Subscriber Details
- **Merge Fields**: Enter merge fields as a JSON object. These are custom fields you've defined in your MailChimp audience.
  ```json
  {
    "FNAME": "John",
    "LNAME": "Doe",
    "BIRTHDAY": "01/15",
    "PHONE": "555-123-4567"
  }
  ```
- **Tags**: Enter a comma-separated list of tags to apply to this member, for example: `new-customer, website-visitor, product-interest`
- **Language**: Two-letter language code for the subscriber's preferred language (e.g., `en` for English, `es` for Spanish)
- **VIP Status**: Whether to mark this subscriber as a VIP in your MailChimp audience

### Output
- **Output Variable**: Name of the variable where the API response will be stored. The response includes details about the subscriber that was added or updated.

## Example Use Cases

- Adding new subscribers from form submissions
- Updating subscriber information when profiles are updated
- Tagging subscribers based on their actions or interests
- Segmenting your audience by updating subscriber attributes

## Troubleshooting

- If you receive an error about invalid merge fields, check that the field names match exactly what's in your MailChimp audience settings
- Make sure your List ID is correct and belongs to the account associated with your API key
- Email addresses must be valid and properly formatted