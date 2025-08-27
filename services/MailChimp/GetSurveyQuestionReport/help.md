# Get Survey Question Report

This connector retrieves detailed report data for a specific question in a Mailchimp survey, allowing you to analyze response statistics and other details about how respondents answered a particular survey question.

## Prerequisites

- You need a Mailchimp account with surveys created
- You need to have the Survey ID and Question ID ready

## Configuration

### Survey Information

- **Survey ID**: Enter the unique identifier for the survey you want to get data from. This can be found in the URL when viewing the survey in Mailchimp.
- **Question ID**: Enter the unique identifier for the specific question within the survey. This can be found in the survey editor or through the Mailchimp API.

### Additional Options

- **Fields to Include**: Optionally specify which fields you want to include in the response. This is a comma-separated list of field names. For nested fields, use dot notation.
  - Example: `options.label,total_responses,query,type`

- **Fields to Exclude**: Optionally specify which fields you want to exclude from the response. This is a comma-separated list of field names. For nested fields, use dot notation.
  - Example: `merge_field,placeholder_label`

### Output

- **Output Variable**: Specify a variable name to store the survey question report data. This variable will contain all the response data including question details, response counts, and other statistics.

## Output Data

The connector returns a JSON object containing:

- Question ID and survey ID
- Question text and type
- Total number of responses
- Response options and counts
- For range questions: average rating
- For email questions: contact counts (known, unknown, new)
- Other question-specific data based on the question type

## Example Use Cases

- Analyze survey response data for specific questions
- Track response rates and patterns for particular survey questions
- Generate custom reports based on survey question data
- Integrate survey question analytics with other systems