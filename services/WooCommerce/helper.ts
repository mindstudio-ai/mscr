const docsPages = `
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_authentication.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_coupons.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_customers.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_data.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_index.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_introduction.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_order-actions.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_order-notes.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_order-refunds.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_orders.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_payment-gateways.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_product-attribute-terms.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_product-attributes.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_product-categories.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_product-custom-fields.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_product-reviews.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_product-shipping-classes.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_product-tags.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_product-variations.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_products.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_refunds.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_reports.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_setting-options.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_settings.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_shipping-methods.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_shipping-zone-locations.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_shipping-zone-methods.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_shipping-zones.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_system-status-tools.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_system-status.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_tax-classes.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_taxes.md
https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-docs/refs/heads/trunk/source/includes/wp-api-v3/_webhooks.md
`.trim();

const helper = async () => {
  const readmeReq = await fetch(
    'https://raw.githubusercontent.com/woocommerce/woocommerce-rest-api-js-lib/refs/heads/master/README.md',
  );
  const readme = await readmeReq.text();

  for (const page of docsPages) {
    // Send to worker
    //
  }
};

helper();
