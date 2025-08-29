# Get Design Export Job

This connector retrieves the status and results of a Canva design export job, including links to downloadable files if the job is successful.

## When to use this connector

Use this connector to:
- Check the status of a design export job that was previously created
- Retrieve download URLs for completed exports
- Check if an export job has failed and why

## Prerequisites

- A Canva Connect integration with the `design:content:read` scope
- An export job ID from a previously created export job

## Configuration

### Export Job ID

Enter the ID of the export job you want to check. This ID is returned when you create a design export job using the Create Design Export Job connector or API.

Example: `e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8`

### Output Variable

Specify a variable name to store the results of the export job check. The output will contain:

- The job status (`in_progress`, `success`, or `failed`)
- Download URLs (if the job was successful)
- Error details (if the job failed)

## Output Format

The connector returns a JSON object with the following structure:

For in-progress jobs:
```json
{
  "job": {
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "in_progress"
  }
}
```

For successful jobs:
```json
{
  "job": {
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "success",
    "urls": [
      "https://export-download.canva.com/..."
    ]
  }
}
```

For failed jobs:
```json
{
  "job": {
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "failed",
    "error": {
      "code": "license_required",
      "message": "User doesn't have the required license to export in PRO quality."
    }
  }
}
```

## Important Notes

- Download URLs are only valid for 24 hours
- You may need to check the job status multiple times until it completes
- For designs with multiple pages, the response will include multiple download URLs (one per page)