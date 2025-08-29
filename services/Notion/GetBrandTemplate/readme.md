# Canva Get Brand Template

This connector retrieves metadata for a specific Canva brand template. It's designed for users who are part of a Canva Enterprise organization.

## Prerequisites

- You need a valid Canva access token with the `brandtemplate:meta:read` scope
- Your integration must act on behalf of a user that's a member of a Canva Enterprise organization

## Configuration

### Brand Template ID

Enter the ID of the brand template you want to retrieve information about. This is typically found in the URL of the template or provided by the Canva API.

Example: `DEMzWSwy3BI`

### Output Variable

Choose a name for the variable that will store the brand template metadata. This variable will contain a JSON object with all the template details.

## Output

The connector returns a JSON object containing:

- `id`: The brand template ID
- `title`: The brand template title
- `view_url`: URL to view the template
- `create_url`: URL to create a new design from the template
- `thumbnail`: Object containing width, height, and URL of the template thumbnail
- `created_at`: When the template was created (Unix timestamp)
- `updated_at`: When the template was last updated (Unix timestamp)

## Rate Limits

This operation is limited to 100 requests per minute for each user of your integration.