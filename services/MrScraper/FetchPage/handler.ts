export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
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

  const {
    url,
    format = 'markdown',
    browserRendering = 'auto',
    waitForSelector,
    geoCode,
    realDevice = 'false',
    homePage = 'false',
    blockResources = 'false',
    targetHeaders,
    timeout,
    maxRetries,
    tokenCap,
    outputVariable,
    screenshotVariable,
    detailsVariable,
  } = inputs;

  // Validate the target URL
  const pageUrl = String(url ?? '').trim();
  if (!pageUrl) {
    throw new Error('Missing URL. Please provide the page URL to fetch.');
  }
  let protocol = '';
  try {
    protocol = new URL(pageUrl).protocol;
  } catch {
    throw new Error(
      `Invalid URL "${pageUrl}". Please use a full http or https URL.`,
    );
  }
  if (protocol !== 'http:' && protocol !== 'https:') {
    throw new Error(
      `Invalid URL "${pageUrl}". Please use a full http or https URL.`,
    );
  }

  // Validate numeric limits
  const timeoutSeconds = Number(String(timeout || '120').trim());
  if (
    !Number.isInteger(timeoutSeconds) ||
    timeoutSeconds < 1 ||
    timeoutSeconds > 300
  ) {
    throw new Error('Timeout must be a whole number of seconds from 1 to 300.');
  }
  const retries = Number(String(maxRetries ?? '3').trim() || '3');
  if (!Number.isInteger(retries) || retries < 0) {
    throw new Error('Max Retries must be a whole number of 0 or more.');
  }
  let tokenCapValue: number | undefined;
  if (tokenCap !== undefined && String(tokenCap).trim() !== '') {
    tokenCapValue = Number(String(tokenCap).trim());
    if (!Number.isInteger(tokenCapValue) || tokenCapValue < 1) {
      throw new Error('Token Cap must be a whole number of 1 or more.');
    }
  }

  // Validate target page headers
  let headersJson: string | undefined;
  if (targetHeaders && String(targetHeaders).trim()) {
    let parsedHeaders: unknown;
    try {
      parsedHeaders = JSON.parse(String(targetHeaders));
    } catch {
      parsedHeaders = undefined;
    }
    if (
      !parsedHeaders ||
      typeof parsedHeaders !== 'object' ||
      Array.isArray(parsedHeaders)
    ) {
      throw new Error(
        'Target Request Headers must be a JSON object, for example {"Accept-Language": "en-US"}.',
      );
    }
    headersJson = JSON.stringify(parsedHeaders);
  }

  const wantHtml = format === 'html';
  const formatLabel = wantHtml ? 'HTML' : 'Markdown';
  const wantScreenshot = Boolean(screenshotVariable);

  // Page options are query parameters, matching the official MrScraper SDK
  const params = new URLSearchParams();
  params.set('token', apiKey);
  params.set('timeout', String(timeoutSeconds));
  params.set(
    'geoCode',
    String(geoCode || 'US')
      .trim()
      .toUpperCase(),
  );
  params.set('html', String(wantHtml));
  params.set('markdown', String(!wantHtml));
  if (wantScreenshot) {
    // Screenshots always use a browser
    params.set('screenshot', 'true');
    params.set('browserRendering', 'true');
  } else if (browserRendering === 'true' || browserRendering === 'false') {
    params.set('browserRendering', browserRendering);
  }
  if (realDevice === 'true') {
    params.set('super', 'true');
  }
  if (homePage === 'true') {
    params.set('warmStart', 'true');
  }
  if (blockResources === 'true') {
    params.set('blockResources', 'true');
  }
  if (waitForSelector && String(waitForSelector).trim()) {
    params.set('waitForSelector', String(waitForSelector).trim());
  }
  if (headersJson) {
    params.set('headers', headersJson);
  }

  const requestBody: Record<string, any> = {
    url: pageUrl,
    maxRetries: retries,
  };
  if (tokenCapValue !== undefined) {
    requestBody.tokenCap = tokenCapValue;
  }

  // Never echo the API key back in error messages or logs
  const redact = (text: string) => text.split(apiKey).join('[REDACTED]');

  log(`Fetching ${pageUrl} as ${formatLabel} with MrScraper...`);

  try {
    const response = await fetch(
      `https://api.mrscraper.com/?${params.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'x-api-token': apiKey,
        },
        body: JSON.stringify(requestBody),
      },
    );

    const responseText = await response.text();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your MrScraper API key in the service configuration.',
        );
      }
      if (response.status === 429) {
        throw new Error(
          'MrScraper rate limit exceeded. Please try again later.',
        );
      }
      throw new Error(
        `MrScraper API request failed (${response.status}): ${redact(responseText).slice(0, 500)}`,
      );
    }

    let data: Record<string, any>;
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error('MrScraper returned a response that is not valid JSON.');
    }

    const errorDetail =
      data?.error === null || data?.error === undefined
        ? ''
        : redact(
            typeof data.error === 'string'
              ? data.error
              : JSON.stringify(data.error),
          );

    // x-status-code is the status the target page returned to MrScraper
    const targetStatusCode =
      Number(response.headers.get('x-status-code')) || null;
    if (targetStatusCode && targetStatusCode >= 400) {
      log(`Warning: the target page responded with HTTP ${targetStatusCode}.`);
    }

    const content = wantHtml ? data?.html : data?.markdown;
    if (typeof content !== 'string' || !content) {
      throw new Error(
        `MrScraper returned no ${formatLabel} content for ${pageUrl}${errorDetail ? `: ${errorDetail}` : '.'}`,
      );
    }
    if (errorDetail) {
      log(`MrScraper reported: ${errorDetail}`);
    }

    if (wantScreenshot) {
      if (typeof data.screenshot === 'string' && data.screenshot) {
        const base64 = data.screenshot.replace(
          /^data:image\/[a-z]+;base64,/i,
          '',
        );
        const screenshotUrl = await uploadFile(
          Buffer.from(base64, 'base64'),
          'image/jpeg',
        );
        setOutput(screenshotVariable, screenshotUrl);
        log('Saved the page screenshot.');
      } else {
        log('Warning: MrScraper did not return a screenshot for this page.');
      }
    }

    if (detailsVariable) {
      setOutput(detailsVariable, {
        url: pageUrl,
        targetStatusCode,
        tokenUsage: data.token_usage ?? null,
        runtime: data.runtime ?? null,
        retryCount: data.retry_count ?? null,
        error: errorDetail || null,
      });
    }

    setOutput(outputVariable, content);
    log(
      `Fetched ${content.length} characters of ${formatLabel}` +
        (data.token_usage !== undefined
          ? ` (${data.token_usage} tokens used).`
          : '.'),
    );
  } catch (error) {
    const errorMessage = redact(
      error instanceof Error ? error.message : String(error),
    );
    log(`Error fetching page: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};
