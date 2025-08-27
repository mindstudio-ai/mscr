# Update Contact Status in Sequence

This connector allows you to update the status of contacts in Apollo sequences. You can mark contacts as having finished a sequence, remove them from a sequence, or stop their progress in a sequence.

## Prerequisites

- You need a master API key from Apollo. Regular API keys won't work with this endpoint.

## Configuration

### Sequence IDs

Enter the Apollo IDs for the sequences you want to update. For multiple sequences, enter one ID per line.

Example:
```
66e9e215ece19801b219997f
66e9e215ece19801b219998f
```

### Contact IDs

Enter the Apollo IDs for the contacts whose sequence status you want to update. Enter one ID per line.

Example:
```
66e34b81740c50074e3d1bd4
66e34b81740c50074e3d1bd5
```

### Update Mode

Choose one of the following options:
- **Mark as Finished**: Mark the contacts as having completed the sequence.
- **Remove from Sequence**: Remove the contacts from the sequence entirely.
- **Stop Progress in Sequence**: Halt the contacts' progress in the sequence.

### Result Variable

Enter a variable name to store the operation result. This will contain the API response with information about the updated contacts.

## Notes

- This operation requires a master API key. If you receive a 403 error, check that you're using a master key.
- The operation is processed asynchronously and returns a job ID that you can use to check the status.