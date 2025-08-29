# Create Folder in Canva

This connector creates a new folder in a Canva user's projects.

## Configuration

### Folder Name
Enter the name for your new folder. This is required and must be between 1-255 characters.

Example: `Marketing Assets 2023`

### Parent Folder ID
Specify where to create the folder:
- Use `root` to create at the top level of the user's projects
- Use `uploads` to create in the user's Uploads folder
- Use a specific folder ID to create inside another folder

Default: `root`

### Output Variable
The connector will store the created folder information in this variable, including:
- Folder ID
- Folder name
- Creation timestamp
- Last updated timestamp
- Thumbnail information (if available)

## Authentication

This connector requires a Canva OAuth connection with the `folder:write` scope.

## Rate Limits

This operation is limited to 20 requests per minute per user.