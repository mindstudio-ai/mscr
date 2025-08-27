# Get Interest Category Interest

This connector retrieves detailed information about a specific interest (also known as a 'group name') within an interest category for a MailChimp list.

## Required Information

### List ID
Enter the unique identifier for your MailChimp list. You can find this ID in your MailChimp account under the list settings or in the URL when viewing the list.

### Interest Category ID
Enter the unique identifier for the interest category. You can find this ID in your MailChimp account when viewing interest categories for a list.

### Interest ID
Enter the unique identifier for the specific interest (group name) you want to retrieve. You can find this ID in your MailChimp account when viewing interests within a category.

### Output Variable
Specify a name for the variable that will store the retrieved interest details. You can reference this variable in subsequent steps of your workflow.

## Advanced Options

### Fields to Include (Optional)
If you only want specific fields in the response, enter them as a comma-separated list. For example:
```
name,subscriber_count,display_order
```

### Fields to Exclude (Optional)
If you want to exclude specific fields from the response, enter them as a comma-separated list. For example:
```
_links
```

## Response Data
The connector will return information about the interest, including:
- Name of the interest
- Number of subscribers associated with the interest
- Display order
- Related IDs and links