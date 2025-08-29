# Get Form Insights

This connector retrieves detailed analytics and insights for a Typeform form, including both form-level metrics and individual question-level insights.

## What this connector does

- Retrieves comprehensive form analytics from Typeform
- Gets completion rates, response counts, and average completion times
- Shows question-level insights including views and dropoffs
- Provides platform-specific metrics (desktop, mobile, tablet)

## Configuration

### Form Selection

- **Form ID**: Enter the unique identifier for your form. This is found in your form URL.
  - Example: In the URL `https://mysite.typeform.com/to/u6nXL7`, the Form ID is `u6nXL7`

### Output Configuration

- **Output Variable**: Choose a name for the variable that will store the form insights data. You can reference this variable in subsequent steps of your workflow.

## Output Data Structure

The connector will return a data structure containing:

```json
{
  "fields": [
    {
      "dropoffs": 1,
      "id": "aBcDe",
      "label": "4",
      "ref": "060e5675-aaf4-4b53-8be8-de956aae4c69",
      "title": "What is your name?",
      "type": "short_text",
      "views": 15
    }
  ],
  "form": {
    "platforms": [
      {
        "average_time": 56000,
        "completion_rate": 45.5,
        "platform": "desktop",
        "responses_count": 100,
        "total_visits": 15,
        "unique_visits": 2
      }
    ],
    "summary": {
      "average_time": 56000,
      "completion_rate": 45.5,
      "responses_count": 100,
      "total_visits": 15,
      "unique_visits": 2
    }
  }
}
```

## Authentication

This connector uses OAuth authentication. Make sure you've connected your Typeform account in the Connections section of MindStudio.