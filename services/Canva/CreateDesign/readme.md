# Create a Canva Design

This connector creates a new design in Canva. You can create designs using preset types (document, whiteboard, presentation) or with custom dimensions.

## Configuration

### Design Type
- **Design Type**: Choose between preset design types or custom dimensions
  - **Preset Design**: Use one of Canva's predefined design types
  - **Custom Dimensions**: Specify your own width and height

- **Preset Type**: If you selected "Preset Design", choose one of:
  - **Document**: A Canva doc for text editing
  - **Whiteboard**: An infinite space for collaboration
  - **Presentation**: For creating slides to present to an audience

- **Width (pixels)**: If you selected "Custom Dimensions", enter the width (40-8000 pixels)

- **Height (pixels)**: If you selected "Custom Dimensions", enter the height (40-8000 pixels)

### Design Details
- **Design Title**: Enter a name for your new design
  
- **Asset ID (Optional)**: If you want to add an existing image to your design, enter its Asset ID. You can find asset IDs by using the Canva API to list folder items.

### Output
- **Output Variable**: Name of the variable that will store information about your created design, including:
  - Design ID
  - Edit and view URLs
  - Thumbnail URL
  - Creation and update timestamps
  - Page count

## Example Response

The output variable will contain a response like:

```json
{
  "design": {
    "id": "DAFVztcvd9z",
    "title": "My New Design",
    "owner": {
      "user_id": "auDAbliZ2rQNNOsUl5OLu",
      "team_id": "Oi2RJILTrKk0KRhRUZozX"
    },
    "thumbnail": {
      "width": 595,
      "height": 335,
      "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?"
    },
    "urls": {
      "edit_url": "https://www.canva.com/api/design/...",
      "view_url": "https://www.canva.com/api/design/..."
    },
    "created_at": 1377396000,
    "updated_at": 1692928800,
    "page_count": 5
  }
}
```