# Create Design Autofill Job

This connector creates an asynchronous job to autofill a Canva design from a brand template with your input data. It allows you to populate text, images, and charts in a Canva template.

## Prerequisites

- A Canva Enterprise account
- A valid Canva API access token with the `design:content:write` scope
- A brand template ID from your Canva account

## Configuration

### Brand Template

- **Brand Template ID**: Enter the ID of your brand template (e.g., `DAFVztcvd9z`). You can find this in the URL of your template.
- **Design Title**: (Optional) Provide a title for your autofilled design. If left blank, the original template title will be used.

### Text Fields

Enter a JSON object that maps text field names to their values. The field names must match those in your brand template.

Example:
```json
{
  "headline": "Welcome to our Summer Event",
  "subtitle": "Join us for an amazing day",
  "description": "This is a longer description of our event that will appear in the body text area."
}
```

### Image Fields

Enter a JSON object that maps image field names to Canva asset IDs. The field names must match those in your brand template.

Example:
```json
{
  "hero_image": "Msd59349ff",
  "logo": "Msd12345ab"
}
```

### Chart Fields (Preview Feature)

Enter a JSON object that maps chart field names to chart data. This is a preview feature in Canva's API.

Example:
```json
{
  "sales_chart": {
    "type": "chart",
    "chart_data": {
      "rows": [
        {
          "cells": [
            {"type": "string", "value": "Region"},
            {"type": "string", "value": "Sales"}
          ]
        },
        {
          "cells": [
            {"type": "string", "value": "North"},
            {"type": "number", "value": 1250}
          ]
        },
        {
          "cells": [
            {"type": "string", "value": "South"},
            {"type": "number", "value": 1500}
          ]
        }
      ]
    }
  }
}
```

### Output

- **Job ID Output Variable**: Name of the variable to store the autofill job ID
- **Design ID Output Variable**: (Optional) Name of the variable to store the design ID (only available if job completes immediately)
- **Design URL Output Variable**: (Optional) Name of the variable to store the design URL (only available if job completes immediately)

## Notes

- The autofill process is asynchronous. You'll receive a job ID immediately, but the design might not be ready right away.
- You can use the Canva API's "Get design autofill job" endpoint to check the status of the job using the job ID.
- Chart data fields are a preview feature and may change without notice.