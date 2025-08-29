# Upload Asset from URL

This connector creates an asynchronous job to upload an asset from a URL to your Canva content library.

## When to use this connector

Use this connector when you want to:
- Upload images or videos to Canva from a publicly accessible URL
- Add assets to your Canva content library programmatically
- Import external media into Canva

## Configuration

### Asset Name
Enter a descriptive name for your asset. This name will appear in your Canva content library.

### Asset URL
Provide the full URL to the file you want to upload. The URL must:
- Be publicly accessible (not password protected)
- Point directly to the file (not a webpage containing the file)
- Support common image formats (JPG, PNG, SVG, etc.) or video formats
- For videos, the file size must be under 100MB

Example: `https://example.com/images/my-logo.png`

### Output Variable
Enter a name for the variable that will store the response from Canva. This will contain details about the upload job including:
- Job ID
- Status (in_progress, success, or failed)
- Asset details (if successful)
- Error information (if failed)

## Important Notes

- The upload process is asynchronous, meaning the initial response may show a status of "in_progress"
- For large files, the upload may take some time to complete
- Supported file types include common image formats (JPG, PNG, SVG) and video formats
- Video uploads are limited to 100MB
- The URL must be publicly accessible from the internet

## Example Response

When successful, the output variable will contain a response like:

```json
{
  "job": {
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "success",
    "asset": {
      "id": "Msd59349ff",
      "name": "My Awesome Upload",
      "tags": ["image", "holiday"],
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