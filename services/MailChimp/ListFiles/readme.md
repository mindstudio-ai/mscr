# List Files from MailChimp File Manager

This connector retrieves a list of files and images stored in your MailChimp File Manager.

## Prerequisites

Before using this connector, make sure you have:
- A MailChimp account
- API Key (configured in the MailChimp service settings)
- Server Prefix (configured in the MailChimp service settings)

## Configuration Options

### File Filtering Options

- **File Type**: Optional filter for the type of files to retrieve. Valid values are:
  - `image` - Only return image files
  - `file` - Only return non-image files
  - Leave empty to return all file types

- **Created By**: Optional filter for the username that created the files

- **Created After**: Optional filter for files created after a specific date and time
  - Format: ISO 8601 (YYYY-MM-DDTHH:MM:SS+00:00)
  - Example: `2023-01-01T00:00:00+00:00`

- **Created Before**: Optional filter for files created before a specific date and time
  - Format: ISO 8601 (YYYY-MM-DDTHH:MM:SS+00:00)
  - Example: `2023-12-31T23:59:59+00:00`

### Pagination & Sorting

- **Count**: Number of files to return per request (maximum 1000, default 10)

- **Offset**: Number of files to skip (useful for pagination)
  - Example: Set to "10" to get the second page when Count is 10

- **Sort Field**: Field to sort the results by
  - Added Date: Sort by when files were added
  - Name: Sort alphabetically by filename
  - Size: Sort by file size

- **Sort Direction**: Order of sorting
  - Ascending: A to Z, smallest to largest, oldest to newest
  - Descending: Z to A, largest to smallest, newest to oldest

### Output

- **Output Variable**: Name of the variable that will store the list of files returned by MailChimp

## Output Format

The connector returns a JSON object containing:
- `files`: Array of file objects with details like id, name, URL, size, etc.
- `total_file_size`: Total size of all files in bytes
- `total_items`: Total number of items matching your query

## Example Usage

To get the 20 most recently added image files:
1. Set File Type to "image"
2. Set Count to "20"
3. Set Sort Field to "Added Date"
4. Set Sort Direction to "Descending"
5. Set Output Variable to "mailchimpFiles"