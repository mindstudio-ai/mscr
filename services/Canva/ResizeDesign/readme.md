# Resize Canva Design

This connector creates a resized copy of a Canva design. The new design will be added to the top level of the user's Canva projects (root folder).

## Prerequisites

- You must have a Canva account with premium features (such as Canva Pro)
- Your Canva integration must have the following OAuth scopes:
  - `design:content:read`
  - `design:content:write`

## How to use this connector

### Design Information
- **Design ID**: Enter the ID of the design you want to resize. You can find this in the Canva design URL.
  - Example: If your design URL is `https://www.canva.com/design/DAGirp_1ZUA/edit`, the Design ID is `DAGirp_1ZUA`

### Resize Options
- **Resize Type**: Choose between:
  - **Preset Design Type**: Use one of Canva's standard design types
  - **Custom Dimensions**: Specify exact pixel dimensions

- **Preset Design Type**: If you selected "Preset Design Type", choose between:
  - **Presentation**: For creating slide presentations
  - **Whiteboard**: For creating collaborative whiteboard designs

- **Width/Height**: If you selected "Custom Dimensions", specify the width and height in pixels
  - Must be between 40-8000 pixels
  - The total area (width × height) cannot exceed 25,000,000 pixels

### Output
- **Output Variable**: Name of the variable that will store information about the resized design

## Limitations

- Designs can be resized to a maximum area of 25,000,000 pixels squared
- Canva docs cannot be resized, and other design types cannot be resized to a Canva doc
- Canva Code designs cannot be resized
- This operation is rate limited to 20 requests per minute per user
- This is an asynchronous operation - the connector returns job information immediately, but the resize operation may still be in progress

## Output Format

The connector returns a JSON object containing:
```json
{
  "job": {
    "id": "450a76e7-f96f-43ae-9c37-0e1ce492ac72",
    "status": "success",
    "result": {
      "design": {
        "id": "DAGirp_1ZUA",
        "title": "My summer holiday",
        "thumbnail": {
          "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?"
        },
        "urls": {
          "edit_url": "https://www.canva.com/design/DAGhRehVa2c/0L_1s4UXSpZhls8EtPaRKw/edit",
          "view_url": "https://www.canva.com/design/DAGhRehVa2c/0L_1s4UXSpZhls8EtPaRKw/view"
        },
        "created_at": 1742856750,
        "updated_at": 1742856752,
        "page_count": 5
      }
    }
  }
}
```