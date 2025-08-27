# Get Survey Responses

This connector allows you to retrieve responses to a survey in your MailChimp account.

## Prerequisites

- You need a MailChimp account with surveys created
- You need your MailChimp API key and server prefix configured in the connection settings

## Configuration

### Survey Configuration

- **Survey ID**: Enter the unique identifier for the survey you want to retrieve responses from. You can find this in the URL when viewing your survey in MailChimp or via the MailChimp API.

### Filter Options

These optional filters help you narrow down the survey responses:

- **Filter by Answered Question ID**: If you want to see only responses that answered a specific question, enter the question ID here.
- **Filter by Chosen Answer ID**: If you want to see only responses that selected a specific answer option, enter the answer ID here.
- **Filter by Respondent Familiarity**: Filter responses based on whether respondents are new, known, or unknown to your MailChimp audience.

### Output Configuration

- **Output Variable**: Enter a name for the variable that will store the survey response data. You can reference this variable in subsequent steps of your workflow.

## Output Format

The connector returns a JSON object containing:

- `responses`: An array of survey responses with details about each respondent
- `total_items`: The total number of responses matching your criteria
- `_links`: Navigation links for pagination

Example output:

```json
{
  "responses": [
    {
      "response_id": "abc123",
      "submitted_at": "2023-04-15T14:30:00Z",
      "contact": {
        "email_id": "md5hash",
        "contact_id": "contact123",
        "status": "Subscribed",
        "email": "example@example.com",
        "full_name": "John Doe"
      },
      "is_new_contact": false
    },
    // More responses...
  ],
  "total_items": 42,
  "_links": [
    // Pagination links...
  ]
}
```