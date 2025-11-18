# Import Sheet Into Folder

Imports CSV or XLSX data into a new sheet in the specified folder.

Note the following:
* Both sheetName and the file name must use ASCII characters.
* The source data must be basic text. To include rich formula data, import and create a sheet first, and then use Update Rows. To work with images, see Cell Images.
* XLS is not supported. You must use XLSX.
* Hierarchical relationships between rows in an external file won't import.

## Inputs

- **folderId** (required): (Required) Folder Id where you can create sheets, sights, reports, templates, and other folders.
- **sheetname** (required): (Required) Desired name of the sheet.
- **headerrowindex** (optional): A zero-based integer indicating the row number to use for column names. Rows before this are omitted.
If not specified, the default values are Column1, Column2, etc.

- **primarycolumnindex** (optional): A zero-based integer indicating the column to designate as primary.

- **filePath** (required): Path to the file that will be uploaded
- **fileName** (optional): Friendly name for the uploaded file
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
