# Update Form - Typeform

This connector allows you to update an existing Typeform form with new fields, logic, and settings.

## ⚠️ Important Warning

This connector uses a `PUT` request which **completely overwrites** the existing form. Any fields not included in your form definition will be **permanently deleted** from the form, along with any responses for those fields.

## How to Use

### Form ID
Enter the unique identifier for the form you want to update. You can find this in your Typeform URL:
- Example: For `https://mysite.typeform.com/to/u6nXL7`, the form ID is `u6nXL7`

### Form Definition
Enter the complete JSON definition of your form. This must include:
- All existing fields you want to keep
- Any new fields you want to add
- Theme settings
- Logic jumps
- Welcome and thank you screens

The easiest way to get a form definition is to:
1. First retrieve your existing form using the "Get Form" connector
2. Modify the JSON as needed
3. Paste the updated JSON into this field

## Example Form Definition

```json
{
  "title": "Updated Customer Feedback Form",
  "type": "form",
  "settings": {
    "is_public": true,
    "is_trial": false
  },
  "theme": {
    "href": "https://api.typeform.com/themes/6lPNE6"
  },
  "workspace": {
    "href": "https://api.typeform.com/workspaces/Jn5YG7"
  },
  "welcome_screens": [
    {
      "ref": "welcome_screen",
      "title": "Welcome to our feedback form!",
      "properties": {
        "description": "We value your input to improve our service."
      }
    }
  ],
  "thankyou_screens": [
    {
      "ref": "default_tys",
      "title": "Thanks for your feedback!",
      "properties": {
        "show_button": true,
        "button_text": "Submit another response"
      }
    }
  ],
  "fields": [
    {
      "ref": "name_field",
      "title": "What's your name?",
      "type": "short_text",
      "validations": {
        "required": true
      }
    },
    {
      "ref": "email_field",
      "title": "What's your email address?",
      "type": "email",
      "validations": {
        "required": true
      }
    },
    {
      "ref": "rating_field",
      "title": "How would you rate our service?",
      "type": "rating",
      "properties": {
        "steps": 5
      }
    }
  ],
  "logic": [
    {
      "type": "field",
      "ref": "rating_field",
      "actions": [
        {
          "action": "jump",
          "details": {
            "to": {
              "type": "thank_you",
              "value": "default_tys"
            }
          },
          "condition": {
            "op": "greater_than",
            "vars": [
              {
                "type": "field",
                "value": "rating_field"
              },
              {
                "type": "constant",
                "value": 3
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## Result Variable

The response from the Typeform API will be stored in this variable, containing the updated form details.