# Remove Subscriber from Workflow

This connector allows you to remove a subscriber from a specific Mailchimp automation workflow. Once a subscriber is removed, they can never be added back to the same workflow.

## When to use this connector

Use this connector when you need to:
- Remove a subscriber from an automation workflow
- Stop a subscriber from receiving further emails in a specific workflow
- Manually remove subscribers who should no longer be part of an automation

## Configuration

### Workflow ID
Enter the unique identifier for the Mailchimp automation workflow. You can find this ID in the URL when viewing the workflow in Mailchimp or via the Mailchimp API.

Example: `57afe96172`

### Email Address
Enter the email address of the subscriber you want to remove from the workflow.

Example: `subscriber@example.com`

### Output Variable
Enter a name for the variable that will store the response from Mailchimp. This variable will contain details about the removal operation, including confirmation that the subscriber was removed.

## Response Structure

The output variable will contain a JSON object with the following structure:

```json
{
  "id": "md5hash", 
  "workflow_id": "57afe96172",
  "list_id": "abc123def",
  "email_address": "subscriber@example.com",
  "_links": [...]
}
```

## Notes

- This action is permanent. Once a subscriber is removed from a workflow, they cannot be added back to the same workflow.
- This connector works with classic automation workflows in Mailchimp.
- The subscriber will still remain on your list; they are only removed from the specific automation workflow.