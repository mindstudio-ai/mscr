# Delete Webhook

This action deletes a webhook from an Airtable base. You need creator-level permissions on the base to use this action.

## Configuration

### Base ID
Enter the ID of your Airtable base. You can find this in your Airtable URL:
```
https://airtable.com/appXXXXXXXXXXXXXX/...
                    ↑
                 Base ID
```

### Webhook ID
Enter the ID of the webhook you want to delete. Webhook IDs typically start with `wnk` followed by alphanumeric characters.

Example: `wnkXXXXXXXXXXXXXX`

### Success Output Variable
Enter a name for the variable that will store the success status of the operation. This variable will be set to `true` if the webhook is successfully deleted.

## Notes
- This action requires a Personal Access Token with the `webhook:manage` scope.
- You must have creator-level permissions on the base to delete webhooks.
- The action will throw an error if the webhook doesn't exist or if you don't have sufficient permissions.