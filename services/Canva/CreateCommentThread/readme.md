# Create Comment Thread on Canva Design

This connector creates a new comment thread on a Canva design. You can use it to add comments to designs, mention users, and optionally assign comments to specific users.

## Authentication

This connector requires a valid Canva access token with the `comment:write` scope. Make sure your Canva connection is properly set up in MindStudio before using this connector.

## Configuration

### Design Information

- **Design ID**: Enter the ID of the Canva design where you want to add a comment. You can find this in the URL of your Canva design (e.g., `DAFVztcvd9z`).

### Comment Details

- **Comment Message**: Enter the text for your comment. You can mention users by including their User ID and Team ID in the format `[user_id:team_id]`.

  Example: `Great work [oUnPjZ2k2yuhftbWF7873o:oBpVhLW22VrqtwKgaayRbP]!`

- **Assignee ID** (Optional): If you want to assign the comment to a specific user, enter their User ID. Note that if you specify an assignee, you must also mention them in your comment message.

### Response Handling

- **Output Variable**: Enter a name for the variable that will store the response from the Canva API. This will include details about the created comment thread, such as its ID, content, and metadata.

## Response Format

The connector will return a JSON object with information about the created comment thread, including:

- Thread ID
- Design ID
- Comment content
- Mentioned users
- Assignee information (if specified)
- Creation and update timestamps

## Rate Limits

This operation is rate limited to 100 requests per minute for each user of your integration.