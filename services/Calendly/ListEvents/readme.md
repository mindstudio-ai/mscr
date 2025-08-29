# Calendly List Events

This connector retrieves scheduled events from your Calendly account with optional filtering parameters.

## Configuration Options

### Event Filters

- **Min Start Time**: Optional. Filter to include only events starting on or after this time. Use ISO 8601 format (e.g., `2023-01-01T00:00:00Z`).

- **Max Start Time**: Optional. Filter to include only events starting on or before this time. Use ISO 8601 format (e.g., `2023-12-31T23:59:59Z`).

- **Event Status**: Optional. Filter events by their status:
  - Active: Events that are currently scheduled
  - Canceled: Events that have been canceled

- **Number of Events**: Optional. Maximum number of events to return (between 1-100). Defaults to 10 if not specified.

### Output Configuration

- **Output Variable**: Required. The name of the variable where the list of events will be stored. This variable will contain an array of event objects with details like event ID, title, start/end times, status, and location.

## Example Usage

To retrieve your 20 most recent active events:
1. Leave "Min Start Time" empty
2. Leave "Max Start Time" empty
3. Select "Active" for "Event Status"
4. Enter "20" for "Number of Events"
5. Specify an output variable name like "calendlyEvents"

## Notes

- This connector uses the Calendly API v2
- The connector requires a valid Calendly OAuth connection
- Times are in UTC timezone in ISO 8601 format