# Get System Status

This connector retrieves detailed system status information from your WooCommerce store, providing insights about your store's environment, database, active plugins, theme, settings, security, and key pages.

## When to use this connector

Use this connector when you need to:
- Troubleshoot issues with your WooCommerce store
- Gather technical information about your store's setup
- Check for outdated plugins or themes
- Verify security settings
- Ensure all required WooCommerce pages are properly configured

## Prerequisites

Before using this connector, you need:
1. A WooCommerce store URL
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)

To generate API credentials:
1. Go to WooCommerce > Settings > Advanced > REST API in your WordPress admin
2. Click "Add Key"
3. Enter a description and select a user with admin privileges
4. Set permissions to "Read"
5. Click "Generate API Key"
6. Copy the Consumer Key and Consumer Secret

## Configuration

### Output Variable
Enter a name for the variable that will store the system status information. This variable will contain a JSON object with detailed information about your WooCommerce store.

## Output Example

The connector returns a comprehensive JSON object with the following structure:

```json
{
  "environment": {
    "home_url": "https://example.com",
    "site_url": "https://example.com",
    "version": "7.8.0",
    "wp_version": "6.2.2",
    "php_version": "8.1.12",
    // Additional environment details...
  },
  "database": {
    "wc_database_version": "7.8.0",
    "database_prefix": "wp_",
    // Database tables and configuration...
  },
  "active_plugins": [
    {
      "plugin": "woocommerce/woocommerce.php",
      "name": "WooCommerce",
      "version": "7.8.0",
      "version_latest": "7.8.0",
      // Plugin details...
    }
    // Other active plugins...
  ],
  "theme": {
    "name": "Storefront",
    "version": "4.2.0",
    "is_child_theme": false,
    "has_woocommerce_support": true,
    // Theme details...
  },
  "settings": {
    "api_enabled": true,
    "currency": "USD",
    "currency_symbol": "$",
    // Store settings...
  },
  "security": {
    "secure_connection": true,
    "hide_errors": true
  },
  "pages": [
    {
      "page_name": "Shop",
      "page_id": "42",
      "page_set": true,
      "page_exists": true,
      // Page details...
    }
    // Other WooCommerce pages...
  ]
}
```

You can use this information in subsequent steps of your workflow to analyze your store's configuration or make decisions based on the system status.