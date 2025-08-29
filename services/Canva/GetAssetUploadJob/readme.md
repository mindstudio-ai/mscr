# Get Asset Upload Job

This action checks the status and results of an asset upload job in Canva.

## When to use this action

Use this action to check the status of an asset (image or video) that you've previously uploaded to Canva using the "Create Asset Upload Job" action. You may need to check the status multiple times until the upload is complete.

## Configuration

### Job ID
Enter the ID of the asset upload job you want to check. This is the ID returned from the "Create Asset Upload Job" action.

Example: `e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8`

### Output Variable
Enter a name for the variable that will store the job status and details. You can reference this variable in later steps of your workflow.

## Response

The action will return a JSON object with details about the job status. The response will include:

- `job.id`: The ID of the asset upload job
- `job.status`: The current status of the job (`in_progress`, `success`, or `failed`)
- `job.asset`: (If successful) Details about the uploaded asset
- `job.error`: (If failed) Information about why the upload failed

### Example Successful Response

```json
{
  "job": {
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "success",
    "asset": {
      "id": "Msd59349ff",
      "name": "My Awesome Upload",
      "tags": ["image", "holiday", "best day ever"],
      "created_at": 1377396000,
      "updated_at": 1692928800,
      "thumbnail": {
        "width": 595,
        "height": 335,
        "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?"
      }
    }
  }
}
```

## Notes

- This action requires a Canva access token with the `asset:read` scope.
- The endpoint is rate limited to 180 requests per minute per user.
- You may need to poll this endpoint multiple times until the job status changes from `in_progress` to either `success` or `failed`.