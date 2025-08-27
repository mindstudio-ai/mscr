# Get Aggregate Stats

This connector retrieves aggregate statistics for all posts in your Beehiiv publication. These statistics include email metrics (opens, clicks, etc.), web metrics, and detailed click data.

## Configuration

### Publication Details

- **Publication ID**: Enter your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard or API settings.
  - Example: `pub_12345abcdef6789`

### Filtering Options (Optional)

You can filter the statistics by:

- **Audience**: Choose which subscriber segment to include:
  - All Audiences (default)
  - Free Subscribers only
  - Premium Subscribers only

- **Platform**: Filter by where the content was viewed:
  - All Platforms (default)
  - Web Only
  - Email Only
  - Both Web and Email

- **Post Status**: Filter by the publication status:
  - All Posts (default)
  - Draft Posts
  - Published Posts
  - Archived Posts

- **Content Tags**: Enter a comma-separated list of tags to filter posts by specific content tags.
  - Example: `marketing, newsletter, updates`

- **Hidden From Feed**: Filter by whether posts are visible in your publication feed:
  - All Posts (default)
  - Hidden Posts Only
  - Visible Posts Only

### Output

- **Output Variable**: Name the variable where you want to store the results. This variable will contain all the aggregate statistics in a structured format.

## Example Response

The output will include detailed statistics like:

```json
{
  "data": {
    "stats": {
      "email": {
        "recipients": 100,
        "delivered": 100,
        "opens": 50,
        "unique_opens": 45,
        "open_rate": 45,
        "clicks": 10,
        "unique_clicks": 8,
        "click_rate": 8,
        "unsubscribes": 1,
        "spam_reports": 1
      },
      "web": {
        "views": 200,
        "clicks": 40
      },
      "clicks": [
        {
          "url": "https://www.example.com",
          "email": {
            "clicks": 10,
            "unique_clicks": 8,
            "click_through_rate": 80
          },
          "web": {
            "clicks": 40,
            "unique_clicks": 40,
            "click_through_rate": 20
          },
          "total_clicks": 50,
          "total_unique_clicks": 48,
          "total_click_through_rate": 40
        }
      ]
    }
  }
}
```