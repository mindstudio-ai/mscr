# Retrieve Notion Database

This connector retrieves a Notion database object, including its data sources, structure, columns, and metadata. This is useful when you need to understand the schema of a database before querying or modifying it.

## Prerequisites

- You must have a Notion integration set up and connected to your workspace
- The database must be shared with your integration
- You need the database ID from your Notion workspace

## Finding Your Database ID

The database ID is a 32-character string found in the URL of your Notion database. For example:

```
https://www.notion.so/workspace/668d797c76fa49349b05ad288df2d136
```

In this URL, `668d797c76fa49349b05ad288df2d136` is the database ID.

You can either:
- Copy the full URL from your browser
- Copy just the 32-character ID

The connector will automatically extract the ID from a full URL if provided.

## Data Sources

Notion databases can contain one or more data sources. Leave **Data Source ID or Name** blank to retrieve details for every data source in the database, or provide a data source ID, URL, or exact name to retrieve only that data source.

## What This Returns

The connector returns a complete database object containing:
- Database metadata (ID, creation time, last edited time)
- Title and description
- Icon and cover (if set)
- Data source summaries in `data_sources`
- Complete data source details, including properties/columns, in `data_source_details`
- Parent information
- Other database settings

## Common Issues

- **404 Error**: The database ID is incorrect or the database doesn't exist
- **403 Error**: The database hasn't been shared with your integration
- **429 Error**: You've exceeded Notion's rate limits

## Example Output

```json
{
  "object": "database",
  "id": "bc1211ca-e3f1-4939-ae34-5260b16f627c",
  "created_time": "2021-07-08T23:50:00.000Z",
  "last_edited_time": "2021-07-08T23:50:00.000Z",
  "title": [
    {
      "type": "text",
      "text": {
        "content": "Grocery List",
        "link": null
      },
      "plain_text": "Grocery List"
    }
  ],
  "data_sources": [
    {
      "id": "bc1211ca-e3f1-4939-ae34-5260b16f627c",
      "name": "Grocery List"
    }
  ],
  "data_source_details": [
    {
      "object": "data_source",
      "id": "bc1211ca-e3f1-4939-ae34-5260b16f627c",
      "properties": {
        "Name": {
          "id": "title",
          "type": "title",
          "title": {}
        },
        "Price": {
          "id": "JiCo",
          "type": "number",
          "number": {
            "format": "dollar"
          }
        }
      }
    }
  ]
}
```