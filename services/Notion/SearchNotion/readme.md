# Search Notion

This connector allows you to search for pages and databases in your Notion workspace. You can search by title, filter by type, sort results, and paginate through large result sets.

## Configuration

### Search Query
Enter text to search for in page and database titles. If left empty, the connector will return all pages and databases that have been shared with your integration.

### Filter by Type
Optionally limit your search results to only pages or only databases:
- **All**: Return both pages and databases (default)
- **Pages Only**: Return only pages
- **Databases Only**: Return only databases

### Sort Direction
Choose how to sort the results by last edited time:
- **Newest First**: Show most recently edited items first (default)
- **Oldest First**: Show oldest edited items first

### Results Per Page
Specify how many results to return per page (maximum 100, default 10).

### Start Cursor
For pagination, enter the `next_cursor` value from previous search results. Leave empty for the first page of results.

### Output Variable
Name the variable where search results will be stored. This will contain the complete response from Notion, including:
- An array of page or database objects
- Pagination information (`next_cursor` and `has_more`)

## Example Usage

To paginate through results, use the connector twice:
1. First run: Leave "Start Cursor" empty to get the first page
2. Second run: Set "Start Cursor" to the `next_cursor` value from the first run's output

## Output Structure

The output will look similar to:

```json
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "954b67f9-3f87-41db-8874-23b92bbd31ee",
      "created_time": "2022-07-06T19:30:00.000Z",
      "last_edited_time": "2022-07-06T19:30:00.000Z",
      "properties": { ... },
      "url": "https://www.notion.so/..."
    },
    // More results...
  ],
  "next_cursor": "AK7hVERYL0NGU3RSSW5HT0ZDSEFSQ0NURVJTCg==",
  "has_more": true
}
```