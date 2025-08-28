# Add or Remove Member Tags

This connector allows you to add or remove tags from a MailChimp list member. Tags help you organize your audience and trigger automations.

## Configuration

### List and Member Information

- **List ID**: Enter the unique identifier for your MailChimp list/audience. You can find this in your MailChimp account under Audience settings.
- **Email Address**: Enter the email address of the list member you want to tag or untag.

### Tag Management

- **Tags to Add**: Enter a comma-separated list of tags you want to add to the member. For example: `new-customer, vip, follow-up`
- **Tags to Remove**: Enter a comma-separated list of tags you want to remove from the member. For example: `prospect, unqualified`
- **Skip Automations**: Choose whether to prevent automations from triggering based on these tag changes.
  - Select "Yes" to prevent automations from running
  - Select "No" to allow automations to run normally

### Output

- **Output Variable**: Name of the variable that will store the result of the operation.

## Notes

- If you specify a tag that doesn't exist and set it as active (in Tags to Add), a new tag will be created automatically.
- You can leave either "Tags to Add" or "Tags to Remove" empty if you only need to perform one operation.
- At least one of "Tags to Add" or "Tags to Remove" must be provided.

## Example Use Cases

- Tag customers who completed a purchase
- Remove tags from unsubscribed members
- Add segmentation tags based on user behavior
- Update member tags before sending a targeted campaign