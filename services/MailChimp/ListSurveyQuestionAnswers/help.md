# List Answers for Survey Question

This connector retrieves answers for a specific survey question in MailChimp, including detailed information about the respondents.

## Prerequisites

- You need a MailChimp account with API access
- You must have created surveys in your MailChimp account
- You need to know the Survey ID and Question ID you want to retrieve answers for

## Configuration

### Survey Information

- **Survey ID**: Enter the unique identifier for your survey. You can find this in the URL when viewing your survey in MailChimp or through the MailChimp API.
- **Question ID**: Enter the unique identifier for the specific question you want to get answers for. This can be found through the MailChimp API.

### Filtering Options

- **Respondent Familiarity**: Optionally filter responses based on the respondent's familiarity:
  - **All Respondents**: No filtering (default)
  - **New Respondents**: Only show responses from contacts added via this survey
  - **Known Respondents**: Only show responses from existing contacts
  - **Unknown Respondents**: Only show responses from contacts with unknown status

### Output Configuration

- **Output Variable**: Name of the variable that will store the survey question answers data

## Output Data Structure

The connector returns a JSON object with the following structure:

```json
{
  "answers": [
    {
      "id": "answer_id",
      "value": "The raw text answer",
      "response_id": "survey_response_id",
      "submitted_at": "2023-01-01T12:00:00Z",
      "contact": {
        "email_id": "md5_hash",
        "contact_id": "contact_id",
        "status": "Subscribed",
        "email": "user@example.com",
        "phone": "+1234567890",
        "full_name": "John Doe"
      },
      "is_new_contact": false
    }
  ],
  "total_items": 1
}
```

## Finding Survey and Question IDs

If you don't know your Survey ID and Question ID:

1. Use the MailChimp API to list all surveys first
2. Then use the Survey ID to list all questions for that survey
3. Use those IDs in this connector