# Get Brand Template Dataset

This action retrieves the dataset definition for a Canva brand template, showing what data fields can be autofilled (such as images, text, and charts).

## Prerequisites

- A Canva Enterprise account
- An OAuth token with the `brandtemplate:content:read` scope

## Configuration

### Brand Template ID

Enter the unique identifier for the brand template you want to retrieve dataset information for. This ID is provided by Canva.

Example: `AAExxxxxx`

### Output Variable

Specify a name for the variable that will store the brand template dataset information. You can reference this variable in subsequent actions.

## Output Format

The action returns a JSON object containing the dataset definition with data fields that can be autofilled in the brand template. Each field will specify its type (image, text, or chart).

Example output:
```json
{
  "dataset": {
    "header_image": {
      "type": "image"
    },
    "title_text": {
      "type": "text"
    },
    "sales_data": {
      "type": "chart"
    }
  }
}
```

## Notes

- This action requires a Canva Enterprise account
- Chart data fields are a preview feature and may have unannounced breaking changes
- The API is rate limited to 100 requests per minute per user