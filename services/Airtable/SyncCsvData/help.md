# Sync CSV Data to Airtable

This connector allows you to sync CSV data directly into an Airtable table using Airtable's Sync API.

## Prerequisites

Before using this connector, you need to:

1. Set up a sync from a base in Airtable (follow instructions in this [support article](https://support.airtable.com/docs/airtable-sync-integration-api-endpoint))
2. Obtain the necessary IDs from your Airtable account

## Configuration

### Base ID
The ID of your Airtable base, which can be found in the URL when viewing your base. It typically starts with "app" followed by alphanumeric characters (e.g., `app12345abcde`).

### Table ID or Name
You can use either:
- The name of your table (e.g., `Orders`)
- The table ID, which typically starts with "tbl" followed by alphanumeric characters (e.g., `tbl12345abcde`)

### API Endpoint Sync ID
The Sync ID created when setting up a sync from a base. You can find this:
- In the setup flow when creating a new Sync API table
- From the synced table settings
- It typically starts with "syn" followed by alphanumeric characters (e.g., `syn12345abcde`)

### CSV Data
Enter your CSV data with the first row containing column names. For example:

```
Name,Email,Phone
John Doe,john@example.com,555-1234
Jane Smith,jane@example.com,555-5678
```

**Limitations:**
- Maximum 10,000 rows per sync run
- Maximum 500 columns
- Request size limited to 2MB
- Rate limited to 20 requests per 5 minutes per base

## Output

The connector returns a success response if the data was successfully synced.

## Example

```
Base ID: app12345abcde
Table ID or Name: Customers
API Endpoint Sync ID: syn12345abcde
CSV Data:
Name,Email,Phone
John Doe,john@example.com,555-1234
Jane Smith,jane@example.com,555-5678
```