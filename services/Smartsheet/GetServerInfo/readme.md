# Get Server Info

Retrieves information about the Smartsheet API server.

## Configuration
- **Output Variable**: Variable to store server information

## Example Response
```json
{
  "supportedLocales": ["en_US", "es_ES", ...],
  "formats": {
    "dateFormats": [...],
    "timeFormats": [...]
  }
}
```

## Notes
- Returns API version and capabilities
- Shows supported locales
- Useful for API compatibility checks

