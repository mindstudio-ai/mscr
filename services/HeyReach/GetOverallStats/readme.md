# HeyReach Get Overall Stats

This connector retrieves LinkedIn engagement statistics from HeyReach for a specified date range, with optional filtering by account IDs and campaign IDs.

## Configuration

### Date Range
- **Start Date**: Enter the beginning date for your stats period in YYYY-MM-DD format (e.g., `2023-01-01`)
- **End Date**: Enter the ending date for your stats period in YYYY-MM-DD format (e.g., `2023-01-07`)

### Filters (Optional)
- **Account IDs**: Enter LinkedIn sender account IDs as a comma-separated list (e.g., `1234,5678`). Leave empty to include all accounts.
- **Campaign IDs**: Enter campaign IDs as a comma-separated list (e.g., `100,101,102`). Leave empty to include all campaigns.

### Output
- **Output Variable**: Name of the variable where the stats results will be stored

## Output Format

The connector returns a JSON object with two main sections:

1. `byDayStats`: Statistics broken down by day
2. `overallStats`: Aggregated statistics for the entire period

Example output:
```json
{
  "byDayStats": {
    "2023-01-01T00:00:00Z": {
      "profileViews": 0,
      "messagesSent": 723,
      "totalMessageStarted": 593,
      "totalMessageReplies": 136,
      "connectionsSent": 4650,
      "connectionsAccepted": 637,
      "messageReplyRate": 0.22934233,
      "connectionAcceptanceRate": 0.13698925
      // additional metrics...
    },
    // additional days...
  },
  "overallStats": {
    "profileViews": 0,
    "messagesSent": 2601,
    "totalMessageStarted": 1766,
    "totalMessageReplies": 395,
    "connectionsSent": 14740,
    "connectionsAccepted": 1828,
    "messageReplyRate": 0.2236693,
    "connectionAcceptanceRate": 0.124016285
    // additional metrics...
  }
}
```

## Requirements

- A valid HeyReach API key must be configured in your environment settings