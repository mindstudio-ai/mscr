# List Routing Form Submissions

This action retrieves a list of submissions for a specific Calendly routing form.

## Configuration

### Routing Form UUID
Enter the UUID of the routing form you want to retrieve submissions for. This is a required field.

Example UUID format: `81d6e1d0-a0e1-4f8c-8eaf-f50e22ba6ec7`

You can find the routing form UUID in your Calendly account or from the URL when viewing the routing form.

### Results Per Page
Specify how many submissions to retrieve per request (between 1-100). The default is 10.

### Sort Order
Choose how to sort the submissions:
- **Newest First**: Shows the most recent submissions first (default)
- **Oldest First**: Shows the oldest submissions first

### Page Token
If you're implementing pagination and want to retrieve a specific page of results, enter the page token here. Leave this empty to retrieve the first page of results.

The response will include a `next_page_token` if there are more results available, which you can use for subsequent requests.

## Output

The action will return an object containing:
- `submissions`: An array of routing form submissions with their details
- `pagination`: Information about pagination, including the next page token if more results are available

Example output:
```json
{
  "submissions": [
    {
      "uri": "https://api.calendly.com/routing_form_submissions/ABCDEF123456",
      "routing_form": "https://api.calendly.com/routing_forms/81d6e1d0-a0e1-4f8c-8eaf-f50e22ba6ec7",
      "submitter": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "tracking": {
        "utm_campaign": "spring_promotion",
        "utm_source": "email"
      },
      "questions_and_answers": [
        {
          "question": "What service are you interested in?",
          "answer": "Consulting"
        }
      ],
      "result": {
        "calendly_invitee_uri": "https://api.calendly.com/scheduled_events/GHIJKL789012/invitees/MNOPQR345678"
      },
      "created_at": "2023-04-01T12:00:00.000000Z"
    }
  ],
  "pagination": {
    "next_page_token": "eyJsYXN0X2l0ZW0iOiIyMDIzLTA0LTAxVDEyOjAwOjAwLjAwMDAwMFoifQ=="
  }
}
```