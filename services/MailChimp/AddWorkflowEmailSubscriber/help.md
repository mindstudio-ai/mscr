# Add Subscriber to Workflow Email

This connector allows you to manually add a subscriber to a specific email in a MailChimp automation workflow, bypassing the default trigger settings. This is useful when you want to trigger automated emails for specific subscribers without waiting for the normal trigger conditions.

## Prerequisites

Before using this connector, you'll need:
- A MailChimp account with API access
- An existing automation workflow in your MailChimp account
- The IDs of both the workflow and the specific email within that workflow

## Finding Your Workflow and Email IDs

1. **Workflow ID**: You can find this in the URL when viewing your automation workflow in MailChimp. For example, in the URL `https://us19.admin.mailchimp.com/campaigns/edit?id=57afe96172`, the workflow ID is `57afe96172`.

2. **Workflow Email ID**: This is harder to find through the UI. You may need to use the MailChimp API to list all emails in your workflow first, or check the URL when editing a specific email in your workflow.

## Configuration

### Workflow ID
Enter the unique identifier for your automation workflow.

### Workflow Email ID
Enter the unique identifier for the specific email within the automation workflow.

### Subscriber Email
Enter the email address of the subscriber you want to add to the workflow email. This email address must already exist in your MailChimp audience/list.

### Output Variable
The name of the variable where the result will be stored. The output will contain details about the added subscriber, including the next scheduled send time.

## Example Use Cases

- Trigger a welcome series for a new subscriber who signed up through a custom form
- Start an onboarding sequence for a customer who made their first purchase
- Send a re-engagement email to a subscriber based on custom criteria

## Notes

- The subscriber must already exist in the list associated with the automation workflow
- This action bypasses any delay settings in your workflow
- The subscriber will receive the email according to the schedule defined in your workflow