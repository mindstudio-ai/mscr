# Add Segment

This action creates a new segment in a specific MailChimp list.

## About Segments in MailChimp

Segments allow you to target specific subscribers based on conditions or by manually adding email addresses. There are two types of segments:

1. **Dynamic Segments** - Based on conditions that automatically update as subscriber data changes
2. **Static Segments** - Manually created lists of specific email addresses (also known as tags)

## Configuration

### List Information
- **List ID**: The unique identifier for your MailChimp list. You can find this in your MailChimp account under Audience settings.

### Segment Details
- **Segment Name**: A descriptive name for your segment
- **Segment Type**: Choose between dynamic (condition-based) or static (email list)
- **Match Type**: For dynamic segments, determines if subscribers must match all conditions or any condition
- **Email Addresses**: For static segments, enter the email addresses to include (comma-separated)

### Output
- **Output Variable**: The name of the variable where the segment details will be stored

## Notes
- For static segments, only email addresses that already exist on your list will be added
- Dynamic segments will be created with a default condition that matches all subscribers
- To add complex conditions to dynamic segments, you'll need to edit the segment in MailChimp after creation

## Example Email Format

When adding emails to a static segment, format them as a comma-separated list:

```
john.doe@example.com, jane.smith@example.com, support@yourcompany.com
```