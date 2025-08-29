# Get Design Import Job

This connector retrieves the status and results of a design import job in Canva, including any imported designs.

## When to use this connector

Use this connector to check the status of a design import job that you previously initiated using the "Create Design Import Job" connector. Since design imports are processed asynchronously in Canva, you'll need to poll this endpoint until you receive either a `success` or `failed` status.

## Prerequisites

- A Canva access token with the `design:content:write` scope
- A design import job ID from a previous "Create Design Import Job" request

## Configuration

### Job ID

Enter the ID of the design import job you want to check. This is the ID returned from the "Create Design Import Job" connector.

Example: `e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8`

### Output Variable

Enter a name for the variable that will store the response data. This variable will contain the complete job status information, including:

- For in-progress jobs: The job ID and status
- For successful jobs: Design details including IDs, titles, URLs, and thumbnails
- For failed jobs: Error code and message

## Response Structure

The response will have this structure:

```json
{
  "job": {
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "success", // or "in_progress" or "failed"
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

## Rate Limits

This operation is rate limited to 120 requests per minute for each user of your integration.