# Check Email Stats

This connector allows you to retrieve detailed statistics and information about an email sent through Apollo, including delivery information, open/click tracking, and recipient details.

## Prerequisites

- You must have a **master API key** from Apollo. This endpoint will not work with standard API keys.
- This feature is not available to Apollo users on free plans.

## Configuration

### Email ID

Enter the unique identifier of the email you want to check. Each outreach email in Apollo is assigned a unique ID.

**Example:** `684b2203a2ce950021cbf730`

To find email IDs, you can use Apollo's "Search for Outreach Emails" endpoint to identify the `id` value for specific emails.

### Output Variable

Enter a name for the variable that will store the email statistics. You can reference this variable in subsequent steps of your workflow.

## Response Data

The connector will return comprehensive information about the email, including:

- Email status (completed, failed, etc.)
- Delivery timestamps
- Tracking information (opens, clicks)
- Contact details
- Campaign information
- Any failure reasons if applicable

## Common Issues

- **403 Forbidden**: This usually means you're not using a master API key or your account is on a free plan.
- **422 Unprocessable Entity**: This typically indicates an invalid email ID.