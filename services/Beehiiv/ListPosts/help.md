# List Posts

This connector allows you to retrieve a list of posts from a specified Beehiiv publication.

## Required Configuration

### Publication ID
Enter the ID of your Beehiiv publication. This ID follows the format `pub_XXXX-XXXX-XXXX-XXXX`.

Example: `pub_00000000-0000-0000-0000-000000000000`

You can find your publication ID in your Beehiiv dashboard or in the URL when viewing your publication settings.

### Output Variable
Specify a name for the variable that will store the list of posts returned by this connector.

## Optional Filtering

### Content Type
Filter posts by their audience type:
- **All Posts**: Return both free and premium posts
- **Free Posts**: Return only free posts
- **Premium Posts**: Return only premium posts

### Platform
Filter posts by the platform they're published on:
- **All Platforms**: Return posts for all platforms
- **Web Only**: Return only posts published on the web
- **Email Only**: Return only posts sent via email
- **Both Web and Email**: Return only posts published on both web and email

### Status
Filter posts by their publication status:
- **All Statuses**: Return posts with any status
- **Draft**: Return only draft posts
- **Confirmed**: Return only published posts
- **Archived**: Return only archived posts

## Pagination & Sorting

### Results Per Page
Specify how many posts to return per page (1-100). Default is 10.

### Page Number
Specify which page of results to retrieve. Default is page 1.

### Sort By
Choose which field to sort the results by:
- **Creation Date**: Sort by when the post was created
- **Publish Date**: Sort by when the post was published
- **Display Date**: Sort by the displayed date of the post

### Sort Direction
Choose the direction to sort results:
- **Newest First**: Show newest posts first
- **Oldest First**: Show oldest posts first

### Include Stats
Choose whether to include engagement statistics for each post:
- **Yes**: Include detailed stats (opens, clicks, etc.)
- **No**: Exclude stats for a more lightweight response

## Response Format

The connector returns a JSON object containing:
- An array of post objects with their details
- Pagination information (total results, current page, etc.)

Example post object:
```json
{
  "id": "post_00000000-0000-0000-0000-000000000000",
  "title": "Post Title",
  "subtitle": "Post subtitle",
  "status": "confirmed",
  "publish_date": 1666800076,
  "web_url": "https://publication.beehiiv.com/p/post-slug"
  // Additional fields depending on your configuration
}
```