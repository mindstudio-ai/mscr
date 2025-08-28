# Create Comment in Notion

This connector creates a comment on a Notion page or in an existing discussion thread.

## Requirements

- A Notion integration with comment capabilities enabled
- The integration must have access to the page you want to comment on

## Configuration

### Comment Location

You must provide either a Page ID or a Discussion ID (but not both):

- **Page ID**: The ID of the Notion page where you want to add a comment. You can provide either:
  - A full Notion URL (e.g., `https://www.notion.so/myworkspace/My-Page-5c6a28216bb14a7eb6e1c50111515c3d`)
  - Just the page ID (e.g., `5c6a28216bb14a7eb6e1c50111515c3d`)

- **Discussion ID**: The ID of an existing discussion thread where you want to add a comment (e.g., `f1407351-36f5-4c49-a13c-49f8ba11776d`)

### Comment Content

- **Comment Text**: The text content of your comment. You can include multiple paragraphs.

- **Output Variable**: Name of the variable where the created comment information will be stored.

## Output

The connector returns the complete comment object from Notion, which includes:
- Comment ID
- Page ID or Discussion ID
- Creation timestamp
- Comment content
- User information

## Example Use Cases

- Adding automated comments to Notion pages based on events in other systems
- Creating comments in discussion threads for team collaboration
- Documenting changes or updates to Notion pages

## Troubleshooting

If you encounter errors:
- Verify your Notion integration has comment capabilities enabled
- Ensure the integration has access to the page you're trying to comment on
- Check that you've provided either a valid Page ID or Discussion ID