# Get Survey Response

This action retrieves a single survey response from a MailChimp survey.

## Prerequisites

- You need a MailChimp API key and server prefix configured in your service settings.
- You need to know the Survey ID and Response ID of the specific survey response you want to retrieve.

## Configuration

### Survey ID

Enter the unique identifier for the survey. This can be found in the URL when viewing the survey in MailChimp or through the MailChimp API.

Example: `survey-123`

### Response ID

Enter the unique identifier for the specific survey response you want to retrieve. This can be obtained from the MailChimp API or from previous survey response listings.

Example: `response-456`

### Output Variable

Enter a name for the variable that will store the survey response data. This variable will contain all the information about the survey response, including:

- Response ID
- Submission timestamp
- Contact information
- Whether this is a new contact
- Survey results including questions and answers

## Response Structure

The response will be stored as a JSON object with this structure:

```json
{
  "response_id": "response-456",
  "submitted_at": "2023-01-01T12:00:00Z",
  "contact": {
    "email_id": "abc123",
    "contact_id": "def456",
    "status": "Subscribed",
    "email": "example@example.com",
    "phone": "+1234567890",
    "full_name": "John Doe"
  },
  "is_new_contact": false,
  "results": [
    {
      "question_id": "q1",
      "question_type": "text",
      "query": "What did you think of our service?",
      "answer": "It was great!"
    }
  ]
}
```