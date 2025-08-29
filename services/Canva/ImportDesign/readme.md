# Import Design to Canva

This connector allows you to import external files as new designs in Canva.

## What You'll Need

- A Canva API access token with the `design:content:write` scope
- A publicly accessible file URL that you want to import into Canva

## Supported File Types

Canva supports importing various file types, including:
- PDF documents
- Images (JPEG, PNG)
- PowerPoint presentations
- Word documents

## Configuration

### File URL
Enter the URL of the file you want to import. This must be a publicly accessible URL.

Example: `https://example.com/myfile.pdf`

### Design Title
Enter a title for your new Canva design. This will be visible in your Canva account.

Example: `My Awesome Design 😍`

### File Type
Select the MIME type of the file you're importing. If you're unsure, select "Auto-detect" and Canva will attempt to determine the file type automatically.

### Output Variable
Specify a variable name to store the result of the import job. This will contain information about the created design, including:
- Design ID
- URLs for editing and viewing the design
- Thumbnail information
- Creation and update timestamps

## Notes

- The import process is asynchronous. The connector will wait for the job to complete before returning results.
- Imported designs will appear in your Canva account.
- Edit and view URLs are temporary and valid for 30 days.
- Large files may be split into multiple designs.