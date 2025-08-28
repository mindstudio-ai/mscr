# Search Members

This action allows you to search for subscribers in your MailChimp account by email address, first name, or last name.

## Configuration

### Search Query
Enter the text you want to search for. This can be:
- An email address (e.g., `john@example.com`)
- A first name (e.g., `John`)
- A last name (e.g., `Smith`)

### List ID (Optional)
If you want to search within a specific list, enter the List ID here. You can find your List ID in MailChimp by:
1. Going to Audience → All Contacts
2. Click on "Settings" in the dropdown
3. Click on "Audience name and defaults"
4. The Audience ID is displayed under "Settings" (it looks like `abc123def`)

Leave this field blank to search across all lists in your account.

### Output Variable
Enter a name for the variable that will store the search results. You can reference this variable in subsequent steps of your workflow.

## Output Format

The output will be a JSON object with the following structure:

```json
{
  "exactMatches": [...],     // Array of members that exactly match your query
  "partialMatches": [...],   // Array of members that partially match your query
  "totalExactMatches": 1,    // Count of exact matches
  "totalPartialMatches": 5   // Count of partial matches
}
```

Each member object contains information such as email address, name, subscription status, and other profile data.