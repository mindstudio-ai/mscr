# Search Campaigns

This connector allows you to search for campaigns in your MailChimp account using specific query terms.

## Configuration

### Search Parameters

- **Search Query**: Enter the term you want to search for across your campaigns. This could be a subject line, campaign name, or any text contained in your campaigns.

- **Fields to Include** (Optional): A comma-separated list of specific fields you want to include in the results. This helps to limit the response data to only what you need.
  
  Example: `id,web_id,status,settings.subject_line,settings.from_name`

- **Fields to Exclude** (Optional): A comma-separated list of fields you want to exclude from the results.
  
  Example: `_links,tracking,social_card`

### Output Options

- **Output Variable**: The name of the variable where the search results will be stored. You can reference this variable in subsequent steps of your workflow.

## Output Format

The output will be a JSON object containing:

- `results`: An array of matching campaigns and snippets
- `total_items`: The total number of items matching your query

## Example Response

```json
{
  "results": [
    {
      "campaign": {
        "id": "abc123def",
        "web_id": 123456,
        "status": "sent",
        "settings": {
          "subject_line": "Monthly Newsletter",
          "from_name": "Your Company"
        }
      },
      "snippet": "...matching text snippet..."
    }
  ],
  "total_items": 1
}
```

## Authentication

This connector uses your MailChimp API key and server prefix, which should be configured in your environment variables.