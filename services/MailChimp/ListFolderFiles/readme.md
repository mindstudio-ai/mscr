# List Files in Folder

This connector retrieves a list of files and images stored in a specific folder in MailChimp's File Manager.

## Prerequisites

- You need a MailChimp account with API access
- You need your MailChimp API key and server prefix configured in the MailChimp service settings
- You need the ID of the folder you want to list files from

## Configuration

### Folder Information

- **Folder ID**: Enter the unique identifier for the folder in MailChimp's File Manager. You can find this ID in the URL when viewing the folder in MailChimp or via the API.

### Filtering Options

- **File Type**: Optionally filter by file type:
  - **All Files**: Return both images and files (default)
  - **Images**: Return only image files
  - **Files**: Return only non-image files

- **Sort By**: Choose how to sort the returned files:
  - **Date Added**: Sort by when files were added (default)
  - **Name**: Sort alphabetically by filename
  - **Size**: Sort by file size

- **Sort Direction**: Choose the sort order:
  - **Ascending**: A to Z, smallest to largest, oldest to newest
  - **Descending**: Z to A, largest to smallest, newest to oldest (default)

- **Number of Results**: Specify how many files to return (default: 10, maximum: 1000)

### Output

- **Output Variable Name**: Enter a name for the variable that will store the list of files and their details

## Output Format

The connector returns a JSON object containing:

- `files`: An array of file objects with details like:
  - `id`: The unique ID of the file
  - `name`: The filename
  - `type`: The file type (image or file)
  - `full_size_url`: URL to access the full-size file
  - `thumbnail_url`: URL to access the thumbnail (for images)
  - `size`: File size in bytes
  - `created_at`: When the file was added
  - And more...
- `total_items`: Total number of items matching your query
- `total_file_size`: Total size of all files in bytes

## Example Usage

After running this connector, you can access individual files in the output using expressions like:
```
{{outputs.filesList.files[0].name}}
{{outputs.filesList.files[0].full_size_url}}
```