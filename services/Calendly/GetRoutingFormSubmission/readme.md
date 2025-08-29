# Get Routing Form Submission

This connector retrieves detailed information about a specific routing form submission from Calendly.

## Prerequisites

- You need to have connected your Calendly account to MindStudio
- You need to have the UUID of a routing form submission you want to retrieve

## Configuration

### Submission UUID

Enter the unique identifier (UUID) of the routing form submission you want to retrieve. This is a string that looks like:

```
0b50d439-5855-4a91-9553-f9e301f5b56a
```

You can find this UUID in the URL when viewing a submission in Calendly, or from the response of other Calendly API calls that list submissions.

### Output Variable

Specify a variable name to store the routing form submission details. The response will include:

- Submission ID
- Routing form ID
- Answers to questions
- Submission status
- Timestamps
- Associated resource information

## Example Usage

After configuring this connector, you can use the output variable in subsequent steps of your workflow to access the submission details. For example, if your output variable is named `submissionData`, you can access properties like:

- `submissionData.resource.id` - The submission ID
- `submissionData.resource.status` - The submission status
- `submissionData.resource.questions_and_answers` - The form responses

## Troubleshooting

If you encounter errors:
- Verify the submission UUID is correct
- Ensure your Calendly account has access to the specified submission
- Check that your Calendly OAuth connection is valid and not expired