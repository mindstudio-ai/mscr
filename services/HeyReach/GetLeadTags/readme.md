# Get Lead Tags

This connector retrieves tags associated with a LinkedIn profile from HeyReach.

## When to use this connector

Use this connector when you want to:
- Get all tags associated with a specific LinkedIn profile
- Filter or segment your leads based on their tags
- Check if a lead has specific tags before taking further actions

## Configuration

### LinkedIn Profile URL

Enter the full LinkedIn profile URL of the lead you want to retrieve tags for. The URL should be in the format:

```
https://www.linkedin.com/in/username/
```

Make sure to include the complete URL including the `https://` prefix.

### Output Variable

Specify a variable name to store the retrieved tags. The output will be an array of strings containing all tags associated with the LinkedIn profile, sorted alphabetically.

## Example Output

```json
[
  "atag1",
  "btag2",
  "ctag3"
]
```

## Notes

- If the profile doesn't exist or has no tags, an empty array will be returned.
- The API key is configured at the service level and doesn't need to be provided for each connector use.