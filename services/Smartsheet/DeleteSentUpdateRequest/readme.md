# Delete Sent Update Request

Deletes the specified sent update request.

**Delete operation is supported only when the specified sent update request is in the pending status.
Deleting a sent update request that was already completed by recipient is not allowed.**

## Inputs

- **sheetId** (required): (Required) Sheet Id of the sheet being accessed.
- **sentUpdateRequestId** (required): (Required) ID of the sent update request
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
