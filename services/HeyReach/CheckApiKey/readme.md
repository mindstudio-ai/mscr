# Check API Key

This action verifies if your HeyReach API key is valid and working properly.

## What it does

This connector makes a simple request to the HeyReach API to check if your API key is valid. It returns:
- `true` if the API key is valid
- `false` if the API key is invalid

## When to use it

Use this action when:
- You want to verify your HeyReach API credentials before running other operations
- You're troubleshooting connection issues with HeyReach
- You need to confirm that your API key has the proper permissions

## Configuration

### Output Variable
Enter a name for the variable that will store the result of the API key check. This variable will contain a boolean value (`true` if the API key is valid, `false` if invalid).

## Requirements

- You must have a HeyReach API key configured in your environment variables
- Your API key can be found in your HeyReach account under: Integrations → Public API

## Example Usage

You can use this action at the beginning of your workflow to verify connectivity before attempting other HeyReach operations. You can then use a condition to check the result:

```
If {{outputVariable}} is true
    → Continue with other HeyReach operations
Else
    → Handle the invalid API key scenario
```