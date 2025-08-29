# Get Design Export Formats

This connector retrieves the available export formats for a specific Canva design.

## Configuration

### Design ID
Enter the ID of the Canva design you want to check available export formats for. This is typically found in the URL of your Canva design.

Example:
```
dAFJH7-Ub_c
```

### Output Variable
Specify a name for the variable that will store the results. This variable will contain a JSON object with all available export formats for the specified design.

## Output Format

The output will be a JSON object with a structure like:

```json
{
  "formats": {
    "pdf": {},
    "jpg": {},
    "png": {},
    "svg": {},
    "pptx": {},
    "gif": {},
    "mp4": {}
  }
}
```

## Authentication

This connector requires a valid Canva access token with the `design:content:read` scope. Make sure your Canva integration is properly configured with the required permissions.

## Notes

- This API is currently provided as a preview by Canva and may be subject to changes.
- The API is rate limited to 100 requests per minute for each user of your integration.