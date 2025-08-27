# Create Records in Airtable

This connector allows you to create one or multiple records in an Airtable table.

## Configuration

### Base and Table Information
- **Base ID**: Enter your Airtable base ID. You can find this in the URL when viewing your base (e.g., `app12345abcde`).
- **Table Name or ID**: Enter either the name of your table (e.g., "Contacts") or the table ID (e.g., `tbl123abc`). Using the table ID is recommended as it won't change if you rename your table.

### Record Configuration
- **Record Data**: Enter the data for your new record(s) in JSON format.
  
  **For a single record**, enter a simple JSON object with field names and values:
  ```json
  {
    "Name": "John Doe",
    "Email": "john@example.com",
    "Status": "Active",
    "Notes": "New customer"
  }
  ```
  
  **For multiple records**, use this format when "Create Multiple Records" is set to "Yes":
  ```json
  [
    {
      "fields": {
        "Name": "John Doe",
        "Email": "john@example.com"
      }
    },
    {
      "fields": {
        "Name": "Jane Smith",
        "Email": "jane@example.com"
      }
    }
  ]
  ```

- **Create Multiple Records**: Choose whether you're creating a single record or multiple records.
  - Select "Single Record" for creating one record
  - Select "Multiple Records" when you want to create multiple records in one request

- **Typecast Values**: Choose whether Airtable should automatically convert string values to the appropriate type.
  - When set to "Yes", Airtable will try to convert strings like "true" to boolean values, number strings to numbers, etc.
  - This is useful when your data comes from a source that only provides strings.

### Output Configuration
- **Output Variable**: Enter a name for the variable that will store the response from Airtable, including the created record ID(s).

## Response

The connector will return the created record(s) information, including:
- Record ID(s)
- Created time
- The fields you provided

This information will be stored in the output variable you specified.