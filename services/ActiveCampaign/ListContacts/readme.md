# List Contacts

This connector allows you to retrieve contacts from your ActiveCampaign account with various filtering options.

## Basic Usage

1. **Email Address** - Enter an email address to find a specific contact
2. **Search Term** - Search across contact names, emails, phone numbers, or organizations
3. **List ID** - Filter contacts that belong to a specific list
4. **Tag ID** - Filter contacts that have a specific tag

## Advanced Filters

Use date filters to narrow down contacts by when they were created or updated:

- **Created After/Before** - Format: YYYY-MM-DD (e.g., 2023-01-01)
- **Updated After/Before** - Format: YYYY-MM-DD (e.g., 2023-01-01)

## Pagination & Sorting

For accounts with many contacts, use these options to manage large result sets:

- **Limit** - Maximum number of contacts to return (default: 20)
- **ID Greater Than** - For pagination, use the highest ID from previous results
- **Sort By** - Choose which field to sort by
- **Sort Order** - Sort ascending (A-Z, oldest-newest) or descending (Z-A, newest-oldest)

## Performance Tips

For best performance when retrieving many contacts:
- Sort by ID (ascending)
- Use the "ID Greater Than" parameter for pagination instead of using offset
- Keep the limit reasonable (20-100)

## Output

The connector returns an array of contact objects with their details, including:
- Contact information (email, name, phone)
- Dates (created, updated)
- Associated lists, tags, and other metadata