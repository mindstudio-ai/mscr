# Get Design Resize Job

This connector retrieves the status and details of a design resize job that was previously created using the Canva API.

## When to use this connector

Use this connector to check the status of a design resize job and retrieve the details of the resized design once the job has completed successfully.

## Configuration

### Job ID
Enter the ID of the design resize job that you want to retrieve. This is the job ID that was returned when you created the design resize job.

Example: `450a76e7-f96f-43ae-9c37-0e1ce492ac72`

### Output Variable
Specify a variable name to store the job details. The output will contain the full job information including:
- Job ID and status
- For successful jobs: design details (ID, title, URLs, thumbnails, etc.)
- For failed jobs: error code and message

## Response Structure

The connector returns different information based on the job status:

### In Progress Job
```json
{
  "job": {
    "id": "450a76e7-f96f-43ae-9c37-0e1ce492ac72",
    "status": "in_progress"
  }
}
```

### Successfully Completed Job
```json
{
  "job": {
    "id": "450a76e7-f96f-43ae-9c37-0e1ce492ac72",
    "status": "success",
    "result": {
      "design": {
        "id": "DAGirp_1ZUA",
        "title": "My summer holiday",
        "thumbnail": {
          "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?"
        },
        "urls": {
          "edit_url": "https://www.canva.com/design/DAGhRehVa2c/0L_1s4UXSpZhls8EtPaRKw/edit",
          "view_url": "https://www.canva.com/design/DAGhRehVa2c/0L_1s4UXSpZhls8EtPaRKw/view"
        },
        "created_at": 1742856750,
        "updated_at": 1742856752,
        "page_count": 5
      }
    }
  }
}
```

### Failed Job
```json
{
  "job": {
    "id": "450a76e7-f96f-43ae-9c37-0e1ce492ac72",
    "status": "failed",
    "error": {
      "code": "design_resize_error",
      "message": "Failed to resize the design"
    }
  }
}
```

## Notes
- You may need to poll this endpoint multiple times until the job status changes from `in_progress` to either `success` or `failed`.
- The URLs provided in a successful response are temporary and will expire after a period of time.