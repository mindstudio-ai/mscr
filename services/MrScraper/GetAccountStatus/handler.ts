export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing MrScraper API Key. Please add your API key in the service configuration.',
    );
  }

  const { outputVariable } = inputs;

  // Never echo the API key back in error messages or logs
  const redact = (text: string) => text.split(apiKey).join('[REDACTED]');

  const toNumber = (value: unknown) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  log('Retrieving MrScraper account status...');

  try {
    const response = await fetch(
      'https://api.app.mrscraper.com/api/v1/subscription-accounts',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'x-api-token': apiKey,
        },
      },
    );

    const responseText = await response.text();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your MrScraper API key in the service configuration.',
        );
      }
      throw new Error(
        `MrScraper account request failed (${response.status}): ${redact(responseText).slice(0, 500)}`,
      );
    }

    let payload: any;
    try {
      payload = JSON.parse(responseText);
    } catch {
      throw new Error('MrScraper returned a response that is not valid JSON.');
    }

    // The account may be wrapped in a data object
    const raw =
      payload &&
      typeof payload === 'object' &&
      payload.data &&
      typeof payload.data === 'object'
        ? payload.data
        : payload;
    const first = Array.isArray(raw) ? raw[0] : raw;
    const account = first && typeof first === 'object' ? first : {};
    const user =
      account.user && typeof account.user === 'object' ? account.user : {};

    // Copy only usage fields: the raw account also contains the API key and
    // billing identifiers, which must not be stored in workflow variables.
    const tokenUsage = toNumber(account.tokenUsage);
    const tokenLimit = toNumber(account.tokenLimit);
    const status = {
      subscriptionStatus: account.stripeStatus ?? null,
      enterprise: Boolean(account.isEnterprise),
      tokenUsage,
      tokenLimit,
      tokenRemaining: Math.max(0, tokenLimit - tokenUsage),
      usagePercent:
        tokenLimit > 0
          ? Number(((tokenUsage / tokenLimit) * 100).toFixed(2))
          : 0,
      rateLimit: toNumber(account.rateLimit),
      rateTtl: toNumber(account.rateTtl),
      autoRenew: Boolean(account.isAutoRenew),
      endsAt: account.endsAt ?? null,
      user: {
        name: user.name ?? null,
        email: user.email ?? null,
        verified: Boolean(user.isVerified),
      },
    };

    log(
      `Subscription ${status.subscriptionStatus ?? 'unknown'}: ${status.tokenRemaining} of ${status.tokenLimit} tokens remaining.`,
    );

    setOutput(outputVariable, status);
  } catch (error) {
    const errorMessage = redact(
      error instanceof Error ? error.message : String(error),
    );
    log(`Error retrieving account status: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};
