# Get Survey Report

This connector retrieves a detailed report for a specific MailChimp survey, including information about its status, responses, and other metadata.

## Configuration

### Survey Information

- **Survey ID**: Enter the unique identifier for the survey you want to retrieve a report for. This is a required field.
  - Example: `040d2c2e1f0`
  - You can find the Survey ID in your MailChimp account or from the URL of your survey

### Field Options (Optional)

- **Fields to Include**: Optionally specify a comma-separated list of fields to include in the response.
  - Example: `id,title,status,total_responses`
  - This helps to limit the response to only the data you need

- **Fields to Exclude**: Optionally specify a comma-separated list of fields to exclude from the response.
  - Example: `created_at,updated_at`
  - This helps to remove data you don't need from the response

### Output

- **Output Variable**: The name of the variable where the survey report data will be stored for use in subsequent actions.

## Response Data

The connector returns a JSON object containing the survey report data, including:

- Survey ID and Web ID
- List ID and name
- Title and URL
- Status (published or unpublished)
- Published date
- Creation and update dates
- Total number of responses

## Prerequisites

- You must have a MailChimp account with API access
- Your API Key and Server Prefix must be configured in the MailChimp service settings