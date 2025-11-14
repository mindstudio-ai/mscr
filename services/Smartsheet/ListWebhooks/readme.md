# List Webhooks

Lists all webhooks owned by the user.

## Inputs

- `includeAll` (boolean, optional): Include all webhook information
- `outputVariable` (string, required): Variable to store the list of webhooks

## Outputs

Returns a paginated list of webhooks with their configuration and status.

## Example

```javascript
{
  "includeAll": true,
  "outputVariable": "webhooksList"
}
```

