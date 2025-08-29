# Import Design from URL

This connector allows you to create a new design in Canva by importing a file from a URL. The connector initiates an asynchronous job to import the external file and returns information about the created design.

## Prerequisites

- You need a valid Canva API token configured in your MindStudio environment variables.
- The file URL must be publicly accessible from the internet.

## Supported File Types

Canva supports importing various file types, including:
- PowerPoint presentations
- Keynote presentations
- PDF documents
- Images (JPEG, PNG)

## Configuration

### Design Import Details

1. **Design Title**: Enter a name for your new design in Canva (required).

2. **File URL**: Provide the full URL to the file you want to import (required).
   Example: `https://example.com/myfile.pptx`

3. **File Type**: Select the MIME type of the file you're importing or leave as "Auto-detect" to let Canva determine the file type automatically.

### Output Configuration

1. **Output Variable**: Specify a variable name to store the import job result.

## Output

The connector will output a JSON object containing:

- Job ID and status information
- For successful jobs: design information including design ID, edit URL, view URL, and thumbnail information
- For failed jobs: error details

### Example Output

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

- The import process is asynchronous, meaning the initial response may show a status of "in_progress".
- URLs for editing and viewing the design are temporary and valid for 30 days.
- The thumbnail URL expires after 15 minutes.