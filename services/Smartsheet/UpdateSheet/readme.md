# Update Sheet

This connector updates properties of an existing Smartsheet, such as the name and user settings.

## Configuration

### Sheet Identification
- **Sheet ID**: The unique identifier of the sheet to update
  - You can find this in the sheet URL: `https://app.smartsheet.com/sheets/{sheetId}`

### Sheet Properties
- **New Sheet Name**: Enter a new name for the sheet
  - Leave empty to keep the current name

### User Settings
- **Critical Path Enabled**: Enable or disable critical path calculation for project sheets
  - No Change: Keep current setting
  - Enable: Turn on critical path
  - Disable: Turn off critical path
  
- **Dependencies Enabled**: Enable or disable row dependencies
  - No Change: Keep current setting
  - Enable: Turn on dependencies
  - Disable: Turn off dependencies

### Output
- **Output Variable**: Name of the variable where the updated sheet info will be stored

## Example Response

```json
{
  "id": 4583654299906948,
  "name": "Updated Project Tracker",
  "accessLevel": "OWNER",
  "permalink": "https://app.smartsheet.com/sheets/...",
  "userSettings": {
    "criticalPathEnabled": true,
    "dependenciesEnabled": true
  }
}
```

## Notes
- You must be the sheet owner or have admin permissions to update sheet properties
- At least one property must be changed
- User settings only apply to appropriate sheet types (e.g., project sheets)
- The response includes the updated sheet object

