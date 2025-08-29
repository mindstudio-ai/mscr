# Get Design Autofill Job

This connector retrieves the status and results of a design autofill job in Canva, including the autofilled design if completed successfully.

## When to use this connector

Use this connector to:
- Check the status of a design autofill job that was previously created
- Retrieve details about a completed design (ID, title, URL, thumbnail)
- Determine if a design creation job has failed and why

## Configuration

### Job ID
Enter the ID of the design autofill job you want to check. This is the job ID that was returned when you created the design autofill job.

Example: `450a76e7-f96f-43ae-9c37-0e1ce492ac72`

### Output Variable
Specify a variable name to store the results of the job query. This will contain all information about the job status and design details if successful.

## Output Format

The output will be a JSON object with the following structure:

```json
{
  "job": {
    "id": "450a76e7-f96f-43ae-9c37-0e1ce492ac72",
    "status": "success", // Can be "in_progress", "success", or "failed"
    "result": {
      "type": "create_design",
      "design": {
        "id": "DAFVztcvd9z",
        "title": "My summer holiday",
        "url": "https://www.canva.com/design/DAFVztcvd9z/edit",
        "thumbnail": {
          "width": 595,
          "height": 335,
          "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?"
        }
      }
    }
  }
}
```

If the job failed, the output will include error details:

```json
{
  "job": {
    "id": "450a76e7-f96f-43ae-9c37-0e1ce492ac72",
    "status": "failed",
    "error": {
      "code": "autofill_error",
      "message": "Error autofilling design from brand template"
    }
  }
}
```

## Notes

- This connector requires a valid Canva access token with the `design:meta:read` scope
- The endpoint is rate limited to 60 requests per minute per user
- Design URLs are temporary and valid for 30 days
- Thumbnail URLs expire after 15 minutes