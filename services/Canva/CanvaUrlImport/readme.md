# Import Design from URL

This connector allows you to import a design from a URL into Canva as a new design. It creates an asynchronous job that imports an external file from a URL.

## Supported File Types

The connector supports various file types including:
- PowerPoint presentations
- Keynote presentations
- PDF documents
- Word documents
- Images (JPEG, PNG, SVG)

## How to Use

1. **Design Title**: Enter a title for the new design that will be created in Canva.

2. **File URL**: Provide the URL of the file you want to import. This URL must be:
   - Publicly accessible from the internet
   - A direct link to the file (not a web page containing the file)
   - Valid and not password protected

   Example: `https://example.com/presentations/my-presentation.pptx`

3. **File Type**: Select the MIME type of the file you're importing. If you're unsure, select "Auto-detect" and Canva will attempt to determine the file type automatically.

4. **Output Variable**: Enter a name for the variable that will store the import job details. You can use this variable in subsequent steps of your workflow.

## Response

The connector returns a job object containing:
- Job ID
- Job status (in_progress, success, or failed)
- If successful, details about the imported design(s) including:
  - Design ID
  - Title
  - URLs for editing and viewing
  - Thumbnail information

## Notes

- This is an asynchronous operation. The initial response will likely show a status of "in_progress".
- The edit and view URLs are temporary and valid for 30 days.
- You need a valid Canva access token with the `design:content:write` scope.