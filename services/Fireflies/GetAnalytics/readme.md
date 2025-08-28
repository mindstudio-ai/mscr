# Fireflies.ai Analytics Connector

This connector allows you to retrieve conversation and meeting analytics data from Fireflies.ai for a specified date range.

## Configuration

### Date Range
- **Start Date**: Enter the start date for your analytics query in ISO 8601 format (e.g., `2024-01-01T00:00:00Z`).
- **End Date**: Enter the end date for your analytics query in ISO 8601 format (e.g., `2024-01-31T23:59:59Z`).

### Analytics Options
- **Analytics Level**: Choose which type of analytics to retrieve:
  - **Team Analytics**: Retrieve only team-level metrics
  - **User Analytics**: Retrieve only user-level metrics
  - **Both Team and User Analytics**: Retrieve both team and user metrics

### Team Analytics Metrics
- **Include Team Conversation Metrics**:
  - **Basic Metrics**: Includes average filler words, questions, and meeting counts
  - **All Metrics**: Includes all available team conversation metrics
  - **None**: Don't include team conversation metrics
  
- **Include Team Meeting Metrics**:
  - **Basic Metrics**: Includes meeting count and duration
  - **All Metrics**: Includes all available team meeting metrics
  - **None**: Don't include team meeting metrics

### User Analytics Metrics
- **Include User Conversation Metrics**:
  - **Basic Metrics**: Includes user filler words, questions, and talk/listen metrics
  - **All Metrics**: Includes all available user conversation metrics
  - **None**: Don't include user conversation metrics
  
- **Include User Meeting Metrics**:
  - **Basic Metrics**: Includes user meeting count and duration
  - **All Metrics**: Includes all available user meeting metrics
  - **None**: Don't include user meeting metrics

### Output
- **Output Variable**: Enter a name for the variable that will store the analytics results.

## Example Use Cases

- Monitor team conversation metrics over time to identify trends
- Compare individual user performance in meetings
- Track meeting frequency and duration across your organization
- Analyze conversation quality metrics like filler words and questions

## Notes

- The date range should be specified in ISO 8601 format (YYYY-MM-DDThh:mm:ssZ)
- This connector requires a valid Fireflies.ai API key configured in your service settings
- Some analytics metrics may require a Business or higher subscription plan