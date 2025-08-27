# Get Post from Beehiiv

This connector retrieves a single post from your Beehiiv publication.

## Configuration

### Post Details

- **Post ID**: Enter the ID of the post you want to retrieve. The ID should be in the format `post_00000000-0000-0000-0000-000000000000`.
  
- **Publication ID**: Enter the ID of the publication the post belongs to. The ID should be in the format `pub_00000000-0000-0000-0000-000000000000`.

### Content Options

- **Include Stats**: Choose whether to include post statistics in the response.
  - **Yes**: Include statistics like email opens, clicks, and web views.
  - **No**: Exclude statistics from the response.

- **Include Content**: Select which content types to include in the response.
  - **All Content**: Include all available content types.
  - **Free Web Content Only**: Only include HTML content for free web readers.
  - **Free Email Content Only**: Only include HTML content for free email subscribers.
  - **Premium Content Only**: Only include HTML content for premium subscribers.
  - **No Content**: Exclude all content from the response.

### Output

- **Output Variable**: The name of the variable where the post data will be stored. This variable will contain the full post object including title, subtitle, authors, publish date, and any requested content or statistics.

## Example Response

```json
{
  "id": "post_00000000-0000-0000-0000-000000000000",
  "subtitle": "Post subtitle",
  "title": "Post Title",
  "authors": ["Author Name"],
  "created": 1666800076,
  "status": "published",
  "subject_line": "Email subject line",
  "preview_text": "Email preview text",
  "slug": "post-slug",
  "web_url": "https://publication.beehiiv.com/p/post-slug",
  "audience": "free",
  "platform": "web",
  "publish_date": 1666800076
  // Additional fields based on your content options...
}
```