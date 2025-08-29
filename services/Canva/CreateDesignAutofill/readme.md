# Create Design from Template

This connector allows you to autofill a Canva design from a brand template with your input data. The connector creates an asynchronous job to populate a template with text, images, and chart data.

## Prerequisites

- You need a Canva Enterprise account
- Your integration must act on behalf of a user that's a member of a Canva Enterprise organization
- You need access to brand templates in your Canva account

## Configuration

### Brand Template ID

Enter the ID of the brand template you want to use. You can find this in the URL of your brand template:
`https://www.canva.com/design/YOUR_TEMPLATE_ID/edit`

### Design Title

Optional title for your new design. If not provided, the new design will have the same title as the brand template.

### Data Fields

This is a JSON object containing the data fields to populate in the template. The field names must match those in your brand template.

#### Supported field types:

1. **Text fields**:
```json
{
  "headline_field": {
    "type": "text",
    "text": "Your headline text here"
  }
}
```

2. **Image fields**:
```json
{
  "hero_image": {
    "type": "image",
    "asset_id": "Msd59349ff"
  }
}
```

3. **Chart fields**:
```json
{
  "sales_chart": {
    "type": "chart",
    "chart_data": {
      "rows": [
        {
          "cells": [
            { "type": "string", "value": "Region" },
            { "type": "string", "value": "Sales" }
          ]
        },
        {
          "cells": [
            { "type": "string", "value": "North" },
            { "type": "number", "value": 10.2 }
          ]
        },
        {
          "cells": [
            { "type": "string", "value": "South" },
            { "type": "number", "value": 13.8 }
          ]
        }
      ]
    }
  }
}
```

### Complete Example

```json
{
  "headline": {
    "type": "text",
    "text": "Summer Sale!"
  },
  "description": {
    "type": "text",
    "text": "Get 50% off all summer items"
  },
  "product_image": {
    "type": "image",
    "asset_id": "Msd59349ff"
  },
  "sales_chart": {
    "type": "chart",
    "chart_data": {
      "rows": [
        {
          "cells": [
            { "type": "string", "value": "Month" },
            { "type": "string", "value": "Revenue" }
          ]
        },
        {
          "cells": [
            { "type": "string", "value": "June" },
            { "type": "number", "value": 12500 }
          ]
        },
        {
          "cells": [
            { "type": "string", "value": "July" },
            { "type": "number", "value": 18700 }
          ]
        }
      ]
    }
  }
}
```

## Output

The connector will return information about the created design, including:
- Design ID
- Design title
- Design URL
- Thumbnail URL
- Creation timestamp
- Update timestamp