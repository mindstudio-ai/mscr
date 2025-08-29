# Typeform: Create Form

This connector allows you to create a new form in Typeform with customized welcome screens, fields, and thank you screens.

## Prerequisites
- A Typeform account
- Connected your Typeform account to MindStudio

## Configuration

### Form Basics
- **Form Title**: Enter the title of your form that will be displayed to respondents.
- **Form Description**: Provide a brief description of your form (optional).
- **Language**: Select the language for your form from the dropdown.
- **Is Public**: Choose whether your form should be publicly available.

### Welcome Screen
- **Welcome Title**: Enter the title for your welcome screen.
- **Welcome Description**: Add a description for your welcome screen (optional).
- **Show Button**: Choose whether to display a button on the welcome screen.
- **Button Text**: If showing a button, enter the text to display (default is "Start").

### Form Fields
- **Fields JSON**: Enter a JSON array of fields to include in your form. This is where you define all your questions.

Example of a simple form with three questions:
```json
[
  {
    "ref": "name_field",
    "title": "What's your name?",
    "type": "short_text"
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
    "ref": "feedback_field",
    "title": "Do you have any feedback for us?",
    "type": "long_text"
  }
]
```

For more complex fields like multiple choice, you can use:
```json
{
  "ref": "favorite_color",
  "title": "What's your favorite color?",
  "type": "multiple_choice",
  "properties": {
    "choices": [
      {
        "label": "Red",
        "ref": "red"
      },
      {
        "label": "Blue",
        "ref": "blue"
      },
      {
        "label": "Green",
        "ref": "green"
      }
    ]
  }
}
```

### Thank You Screen
- **Thank You Title**: Enter the title for your thank you screen.
- **Show Button**: Choose whether to display a button on the thank you screen.
- **Button Text**: If showing a button, enter the text to display.
- **Redirect URL**: Optionally enter a URL to redirect users to after form submission.
- **Show Social Share Icons**: Choose whether to display social media sharing icons.

### Output
- **Output Variable**: Enter a name for the variable that will store information about the created form.

## What Happens
When this connector runs, it will:
1. Create a new form in your Typeform account with the specified settings
2. Return the form ID and public URL in the output variable

## Output Format
The output variable will contain an object with:
- `id`: The unique ID of the created form
- `self`: The API URL for the form
- `public_url`: The public URL where the form can be accessed