# List Brand Templates

This action retrieves a list of brand templates from Canva that the authenticated user has access to.

## Prerequisites

- A Canva Enterprise account
- An OAuth integration with Canva that has the `brandtemplate:meta:read` scope

## Configuration Options

### Search Term
Enter keywords to search for specific brand templates by name. Leave blank to return all templates.

### Ownership
Filter templates based on who owns them:
- **Any (owned and shared)**: Show all templates the user has access to
- **Owned by me**: Show only templates created by the user
- **Shared with me**: Show only templates shared with the user

### Sort By
Choose how to order the results:
- **Relevance**: Sort using Canva's relevance algorithm
- **Last Modified (newest first)**: Most recently updated templates first
- **Last Modified (oldest first)**: Oldest updated templates first
- **Title (A-Z)**: Alphabetical order
- **Title (Z-A)**: Reverse alphabetical order

### Dataset Filter
Filter templates based on whether they have data fields:
- **Any templates**: Show all templates
- **Templates with data fields**: Show only templates that have dataset definitions (useful for Autofill APIs)

### Maximum Results
Specify the maximum number of templates to return. The connector will automatically handle pagination to fetch up to this number of results.

### Output Variable
The name of the variable that will store the list of brand templates. The output will be an array of objects with the following properties:
- `id`: The template ID
- `title`: The template name
- `view_url`: URL to view the template
- `create_url`: URL to create a new design from the template
- `thumbnail`: Object containing width, height, and URL of the template thumbnail
- `created_at`: When the template was created (Unix timestamp)
- `updated_at`: When the template was last updated (Unix timestamp)

## Example Output

```json
[
  {
    "id": "DEMzWSwy3BI",
    "title": "Advertisement Template",
    "view_url": "https://www.canva.com/design/DAE35hE8FA4/view",
    "create_url": "https://www.canva.com/design/DAE35hE8FA4/remix",
    "thumbnail": {
      "width": 595,
      "height": 335,
      "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png"
    },
    "created_at": 1704110400,
    "updated_at": 1719835200
  }
]
```