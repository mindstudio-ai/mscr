# Delete Subscription

This action permanently deletes a subscription from a publication in beehiiv. This is a destructive action that cannot be undone.

## When to use this action

Use this action when you need to completely remove a subscriber from your beehiiv publication. Note that in most cases, it's better to unsubscribe rather than delete a subscription.

## Important considerations

- This action **permanently deletes** the subscription and all associated data
- For premium subscriptions, deletion will stop future billing
- This action cannot be undone
- You must confirm the deletion by selecting "Yes, I understand this action cannot be undone"

## Required information

### Publication ID
Enter the ID of your beehiiv publication. This ID starts with `pub_` followed by a UUID.
Example: `pub_00000000-0000-0000-0000-000000000000`

### Subscription ID
Enter the ID of the subscription you want to delete. This ID starts with `sub_` followed by a UUID.
Example: `sub_00000000-0000-0000-0000-000000000000`

## Authentication

This action requires a beehiiv API key to be configured in the beehiiv service settings.