# Delete Comment

This action allows you to delete a comment from a record in your Airtable base.

## Prerequisites

- You need an Airtable account with a Personal Access Token or OAuth token
- You must have at least "Base commenter" permissions
- For comments created by other users, you need to be an Enterprise Admin to delete them

## Configuration

### Base ID
Enter the ID of your Airtable base. This is the string that appears in your Airtable URL after `airtable.com/` and usually starts with "app".

Example: `appABC123DEF456`

### Table ID or Name
Enter either the table ID (starts with "tbl") or the table name as it appears in your Airtable base.

Examples:
- `tblXYZ789ABC123` (ID)
- `Projects` (Name)

### Record ID
Enter the ID of the record that contains the comment you want to delete. Record IDs typically start with "rec".

Example: `recABC123XYZ789`

### Comment ID
Enter the ID of the specific comment you want to delete. Comment IDs typically start with "com".

Example: `comB5z37Mg9zaEPw6`

## Output

The action will return a JSON object with:
- `deleted`: A boolean indicating if the comment was successfully deleted (true/false)
- `id`: The ID of the deleted comment

## Limitations

- Non-admin API users can only delete comments they have created
- Enterprise Admins can delete any comment from a record