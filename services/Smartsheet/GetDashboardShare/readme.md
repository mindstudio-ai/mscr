# Get Dashboard Share

Gets a list of all users and groups to whom the specified dashboard is shared, and their access level.

## Inputs

- **sightId** (required): (Required) SightID of the sight being accessed.
- **shareId** (required): (Required) Share Id.
- **accessapilevel** (optional): Allows COMMENTER access for inputs and return values. For backwards-compatibility, VIEWER is the default. For example, to see whether a user has COMMENTER access for a sheet, use accessApiLevel=1.

- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
