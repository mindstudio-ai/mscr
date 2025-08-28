# Create Empty List

This connector creates an empty list in HeyReach that you can later populate with leads or companies.

## Configuration

### List Name
Enter a descriptive name for your new list. This will help you identify it in your HeyReach account.

Example: `Q3 Sales Prospects`

### List Type
Select the type of list you want to create:
- **Lead List**: For storing individual contacts/leads
- **Company List**: For storing company information

### Output Variable
Enter a name for the variable that will store the created list information. This variable will contain details about your new list, including:
- List ID
- List name
- List type
- Creation time
- Other metadata

## What happens when this runs?

When executed, this connector will:
1. Create a new empty list in your HeyReach account with the specified name and type
2. Return the list details, including a unique ID that you can use in other HeyReach operations
3. Store this information in your specified output variable

## Common use cases

- Creating a list before importing leads
- Setting up campaign target lists
- Organizing prospects by category or segment
- Preparing lists for outreach campaigns

## Notes

- The list will be created empty (with 0 contacts)
- You can add leads or companies to this list using other HeyReach connectors
- List names should be unique for better organization