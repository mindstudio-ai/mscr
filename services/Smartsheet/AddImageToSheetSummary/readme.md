# Add Image To Sheet Summary

Adds an image to the summary field.

## Inputs

- **sheetId** (required): (Required) Sheet Id of the sheet being accessed.
- **fieldId** (required): (Required) Summary Field Id of the sheet summary field being accessed.
- **alttext** (optional): Url-encoded alternate text for the image
- **overridevalidation** (optional): You may use the query string parameter **overrideValidation** with a value of **true** to allow a cell value outside of the validation limits. You must specify **strict** with a value of **false** to bypass value type checking.
- **filePath** (required): Path to the file that will be uploaded
- **fileName** (optional): Friendly name for the uploaded file
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
