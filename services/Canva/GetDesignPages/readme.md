# Get Design Pages - Canva

This connector retrieves metadata for pages in a Canva design, including page-specific thumbnails.

## Prerequisites

- A Canva account with access to the design you want to retrieve pages from
- Authorization to access the Canva API (OAuth connection configured in MindStudio)

## Configuration

### Basic Configuration

- **Design ID**: Enter the ID of the Canva design you want to retrieve pages from. This is typically found in the URL of your design (e.g., if your design URL is `https://www.canva.com/design/ABC123/edit`, the design ID is `ABC123`).

- **Output Variable**: Name of the variable where the API response will be stored. This will contain an array of page metadata.

### Pagination Options

- **Offset** (optional): The page index to start from (1-based indexing). If not specified, defaults to 1.
  - Minimum: 1
  - Maximum: 500

- **Limit** (optional): The number of pages to return. If not specified, defaults to 50.
  - Minimum: 1
  - Maximum: 200

## Output Format

The connector returns data in the following format:

```json
{
  "items": [
    {
      "index": 1,
      "thumbnail": {
        "width": 595,
        "height": 335,
        "url": "https://document-export.canva.com/example/thumbnail/0001.png?..."
      }
    },
    // Additional pages...
  ]
}
```

## Notes

- This API is provided as a preview by Canva and may have unannounced breaking changes.
- The thumbnail URLs expire after 15 minutes.
- The endpoint is rate limited to 100 requests per minute per user.