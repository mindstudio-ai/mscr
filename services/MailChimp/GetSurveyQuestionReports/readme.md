# Get Survey Question Reports

This connector retrieves detailed reports for questions in a Mailchimp survey.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have created surveys in your Mailchimp account
- You need to know the Survey ID of the survey you want to analyze

## Configuration

### Survey Information

- **Survey ID**: Enter the unique identifier for the survey you want to analyze. You can find this in the URL when viewing your survey in Mailchimp or via the Mailchimp API.

### Optional Parameters

- **Fields to Include**: Specify which fields you want to include in the response as a comma-separated list. This helps reduce response size if you only need specific data.
  - Example: `questions.id,questions.query,questions.total_responses`

- **Fields to Exclude**: Specify which fields you want to exclude from the response as a comma-separated list.
  - Example: `_links,questions._links`

### Output

- **Output Variable**: The name of the variable where the survey question reports will be stored for use in subsequent steps of your workflow.

## Response Data

The response includes:

- Question details (ID, text, type)
- Response statistics (total responses, average ratings)
- Answer options and their selection counts
- For email questions: counts of known, unknown, and new contacts

## Common Use Cases

- Analyze survey performance and response patterns
- Export survey data for further analysis
- Create custom reports based on survey responses
- Track engagement with different survey questions