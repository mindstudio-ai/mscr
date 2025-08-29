# Check RTBF Job Status

This connector allows you to check the status of a Right To Be Forgotten (RTBF) job in Typeform.

> ⚠️ **Note**: This endpoint is deprecated by Typeform and no longer officially supported. Consider writing a custom script instead as recommended by Typeform.

## Configuration

### Account ID
Enter the Typeform account ID for which the RTBF job was created. This is a unique identifier for your Typeform account.

Example: `01D9W9DZ93G5Y9CSK6ADHP79B1`

### Job ID
Enter the ID of the RTBF job you want to check. This is the identifier returned when you initially created the RTBF job.

Example: `job_12345`

### Output Variable
Enter a name for the variable that will store the job status information. This variable will contain the complete response from Typeform, including the job status.

## Response Format

The output variable will contain a JSON object with the following structure:

```json
{
  "accountID": "01D9W9DZ93G5Y9CSK6ADHP79B1",
  "status": "Done",
  "token": "01D9W9DZ93G5Y9CSK6ADHP79BC"
}
```

The `status` field indicates the current state of the job. A value of "Done" means the RTBF job has completed successfully.

## Authentication

This connector uses your Typeform OAuth token for authentication. Make sure your Typeform connection is properly configured in MindStudio.