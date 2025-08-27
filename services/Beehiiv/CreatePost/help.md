# Create Post in beehiiv

This connector creates a new post in your beehiiv publication.

## Required Fields

- **Publication ID**: Your beehiiv publication ID, which starts with `pub_`. You can find this in your beehiiv dashboard URL or in the publication settings.
- **Title**: The title of your post.
- **Output Variable**: Name of the variable where the created post ID will be stored.

## Optional Fields

### Basic Information

- **Subtitle**: A brief description that appears below the title.
- **Body Content**: The HTML content of your post. You can use HTML tags for formatting.
- **Status**: Choose between:
  - **Draft**: Saves the post as a draft
  - **Confirmed**: Ready to be published (default)

### Publishing Options

- **Scheduled At**: When to publish the post in ISO 8601 format (e.g., `2024-12-25T12:00:00Z`). If not provided and status is "confirmed", the post will be published immediately.
- **Thumbnail Image URL**: A URL to an image that will be used as the post thumbnail.
- **Content Tags**: Comma-separated list of tags for your post (e.g., `newsletter,update,news`).

## Example Usage

Create a draft post with a scheduled publication date:

1. Set **Publication ID** to your publication ID (e.g., `pub_1a2b3c4d5e6f`)
2. Set **Title** to "My Monthly Newsletter"
3. Set **Subtitle** to "Updates for June 2024"
4. Add your content to **Body Content**
5. Set **Status** to "Draft"
6. Set **Scheduled At** to a future date (e.g., `2024-06-30T09:00:00Z`)
7. Set **Output Variable** to "postId"

The connector will return the ID of the created post in the variable you specified.