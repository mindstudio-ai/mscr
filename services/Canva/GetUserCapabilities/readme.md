# Get User Capabilities

This action retrieves the API capabilities for the user account associated with the provided Canva access token.

## What it does

This connector checks what API capabilities are available for the authenticated Canva user. Different Canva plans provide access to different API capabilities:

- **autofill**: Available to members of Canva Enterprise organizations
- **brand_template**: Available to members of Canva Enterprise organizations  
- **resize**: Available to users on premium Canva plans (such as Canva Pro)

## Configuration

### Output Variable

Enter a name for the variable that will store the list of capabilities returned by the API. This will be an array of strings containing the capability names.

## Example Output

The output will be an array of capability names, for example:

```json
["autofill", "brand_template"]
```

## Notes

- This operation is rate limited to 10 requests per minute per user
- The Canva OAuth token must have the `profile:read` scope
- No input parameters are required for this action