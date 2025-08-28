# Add Tags to Lead

This connector adds tags to a lead in HeyReach using their LinkedIn profile URL or LinkedIn ID.

## Configuration

### Lead Identification
You must provide at least one of the following to identify the lead:

- **LinkedIn Profile URL**: The full LinkedIn profile URL of the lead (e.g., `https://www.linkedin.com/in/john-doe/`)
- **LinkedIn ID**: The LinkedIn ID of the lead (can be found in responses from other HeyReach endpoints)

### Tag Configuration

- **Tags**: Enter a comma-separated list of tags to add to the lead (e.g., `prospect, follow-up, interested`)
- **Create Tags If Not Existing**: 
  - Select **Yes** to automatically create any tags that don't already exist in your HeyReach account
  - Select **No** if you want the request to fail when a tag doesn't exist

### Output

- **Output Variable**: The name of the variable where the result will be stored. The output will contain an array of newly assigned tags.

## Example Output

```json
{
  "newAssignedTags": ["prospect", "follow-up"]
}
```

## Notes

- Tags that are already assigned to the lead will not be affected
- At least one of LinkedIn Profile URL or LinkedIn ID must be provided
- The API key must be configured in your HeyReach service settings