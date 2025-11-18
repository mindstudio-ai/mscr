# Update Report Share

Updates the access level of a user or group for the specified report.

## Inputs

- **reportId** (required): (Required) reportID of the report being accessed.
- **shareId** (required): (Required) Share Id.
- **accessapilevel** (optional): Allows COMMENTER access for inputs and return values. For backwards-compatibility, VIEWER is the default. For example, to see whether a user has COMMENTER access for a sheet, use accessApiLevel=1.

- **accesslevel** (optional): Body property
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
