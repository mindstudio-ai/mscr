# Update Meeting Title

This connector allows you to update the title of a meeting transcript in Fireflies.ai.

## Prerequisites

- You need a Fireflies.ai account with admin privileges
- The API key must be configured in your MindStudio environment settings
- The meeting owner needs to be in your team

## Configuration

### Meeting Information

- **Transcript ID**: Enter the unique identifier of the transcript you want to update. This is typically found in the URL when viewing a transcript in Fireflies.ai or can be retrieved using the Fireflies.ai API.

- **New Title**: Enter the new title you want to assign to the meeting transcript.

### Output

- **Output Variable**: Specify a variable name to store the result of the operation. The output will contain the updated title information.

## Example Response

```json
{
  "title": "New Title"
}
```

## Troubleshooting

If you encounter errors, check the following:

- **Authentication Error**: Verify your API key is correct in the MindStudio environment settings
- **Permission Error**: Ensure you have admin privileges to update meeting titles
- **Not Found Error**: Confirm the transcript ID exists and you have access to it

## Additional Resources

For more information about the Fireflies.ai API, visit their [documentation](https://docs.fireflies.ai/).