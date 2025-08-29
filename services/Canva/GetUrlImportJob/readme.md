# Get URL Import Job Status

This connector retrieves the status and results of a URL import job in Canva, including any imported designs.

## What this connector does

When you import a URL into Canva using the Create URL Import Job API, the process runs asynchronously. This connector allows you to check the status of that job and retrieve the results once it's complete.

The connector will return different information depending on the job status:
- **In Progress**: Basic job status information
- **Success**: Complete job information including design details (ID, title, URLs, thumbnails)
- **Failed**: Error information explaining why the job failed

## Prerequisites

- A Canva API access token with the `design:content:write` scope
- A URL import job ID from a previous Create URL Import Job request

## Configuration

### Job ID
Enter the ID of the URL import job you want to check. This ID is returned when you create a URL import job.

Example: `e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8`

### Output Variable
Specify a variable name to store the job status and results. This variable will contain all the information returned by the Canva API.

## Response Structure

The connector returns a structured object containing:

```json
{
  "job": {
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "success",
    "result": {
      "designs": [
        {
          "id": "DAGQm2AkzOk",
          "title": "My Awesome Design",
          "thumbnail": {
            "width": 376,
            "height": 531,
            "url": "https://document-export.canva.com/..."
          },
          "urls": {
            "edit_url": "https://www.canva.com/api/design/...",
            "view_url": "https://www.canva.com/api/design/..."
          },
          "created_at": 1726198998,
          "updated_at": 1726199000
        }
      ]
    }
  }
}
```

## Notes

- You may need to call this connector multiple times until the job status changes from `in_progress` to either `success` or `failed`.
- The API is rate limited to 120 requests per minute per user.
- The edit and view URLs returned are temporary and valid for 30 days.
- Thumbnail URLs expire after 15 minutes.