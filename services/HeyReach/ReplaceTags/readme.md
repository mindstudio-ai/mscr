# Replace Tags

This action replaces all existing tags on a HeyReach lead with new tags you specify.

## Configuration

### Lead Identification

You must provide either a LinkedIn Profile URL or LinkedIn ID to identify the lead:

- **LinkedIn Profile URL**: The full URL of the lead's LinkedIn profile (e.g., `https://www.linkedin.com/in/john-doe/`)
- **LinkedIn ID**: The LinkedIn ID of the lead (can be found in responses from other HeyReach endpoints)

### Tag Configuration

- **Tags**: Enter a comma-separated list of tags that will replace all existing tags on the lead (e.g., `prospect, follow-up, interested`)
- **Create Tags If Not Existing**: 
  - Select "Yes" to automatically create any tags that don't already exist in your HeyReach account
  - Select "No" to only use existing tags (the request will fail if you specify a tag that doesn't exist)

### Output

- **Output Variable**: The name of the variable where the response will be stored. The response contains the newly assigned tags.

## Example Response

```json
{
  "newAssignedTags": [
    "prospect",
    "follow-up",
    "interested"
  ]
}
```

## Notes

- This action completely replaces all existing tags on the lead. Any tags not included in your list will be removed.
- You must provide either a LinkedIn Profile URL or LinkedIn ID, but you don't need to provide both.
- Your HeyReach API key must have sufficient permissions to modify leads.