# Get Import Status

Gets the status of an import job.

## Configuration
- **Job ID**: ID of the import job to check
- **Output Variable**: Variable to store status

## Status Values
- **PENDING**: Import queued
- **IN_PROGRESS**: Currently importing
- **COMPLETED**: Import successful
- **FAILED**: Import failed

## Notes
- Use job ID from import response
- Poll this endpoint for long-running imports

